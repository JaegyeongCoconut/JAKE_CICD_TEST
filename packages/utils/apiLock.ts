interface ApiLockProps {
  expiredAt: number; //NOTE: lock 만료시각
  startedAt: number; //NOTE: lock 획득시각
}

const STORAGE_PREFIX = "API_LOCK:";

//NOTE: 현재 lock 조회
const getLock = (key: string): ApiLockProps | null => {
  const storedLockRaw = localStorage.getItem(STORAGE_PREFIX + key);

  if (!storedLockRaw) return null;

  try {
    return JSON.parse(storedLockRaw);
  } catch (error) {
    console.warn("Invalid lock data", error);
    return null;
  }
};

interface SetLockProps {
  key: string; //NOTE: 동시 실행이 허용되지 않는 최소 단위
  lockDuration: number;
}

const setLock = ({ key, lockDuration }: SetLockProps): ApiLockProps | null => {
  const now = Date.now();

  const lockInstance: ApiLockProps = {
    startedAt: now,
    expiredAt: now + lockDuration,
  };

  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(lockInstance));
    return lockInstance;
  } catch {
    return null;
  }
};

//NOTE: lock 유효성 체크
const isLockActive = (lock: ApiLockProps): boolean => {
  return lock.expiredAt > Date.now();
};

interface ClearLockProps {
  key: string;
  startedAt: number;
}

const clearLock = ({ key, startedAt }: ClearLockProps): void => {
  const storedLock = getLock(key);

  if (!storedLock) return;

  // NOTE: startedAt이 일치하는 경우(현재 요청에서 생성한 lockInstance)만 해제
  if (storedLock.startedAt === startedAt) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  }
};

interface WithApiLockProps<T> {
  key: string;
  maxLockDuration: number;
  request: () => Promise<T>;
}

export const withApiLock = async <T>({
  key,
  maxLockDuration,
  request,
}: WithApiLockProps<T>): Promise<T> => {
  const existingLock = getLock(key);

  if (existingLock && isLockActive(existingLock)) {
    alert("이미 처리 중인 요청입니다.");
    throw new Error("이미 처리 중인 요청입니다."); //NOTE: 후속 동작 막기 위해 설정
  }

  // NOTE: lock 설정
  const lockInstance = setLock({ key, lockDuration: maxLockDuration });

  try {
    const result = await request();

    return result;
  } finally {
    if (lockInstance) {
      // NOTE: lock이 정상적으로 localStorage에 저장된 경우에만 해제 (저장 실패 대비)
      clearLock({ key, startedAt: lockInstance.startedAt });
    }
  }
};
