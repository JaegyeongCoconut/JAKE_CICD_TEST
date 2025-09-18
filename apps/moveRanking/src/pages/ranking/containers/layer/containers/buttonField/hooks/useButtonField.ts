import type { MutableRefObject } from "react";
import { useEffect, useState } from "react";

interface UseButtonFieldProps {
  rank: number;
  rankingListRefs: MutableRefObject<(HTMLLIElement | null)[]>;
}

const useButtonField = ({ rank, rankingListRefs }: UseButtonFieldProps) => {
  const [isRankInView, setIsRankingInView] = useState(false);

  const handleTop10ButtonClick = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isRankingListRefsExist = (index: number): HTMLLIElement | null =>
    rankingListRefs &&
    rankingListRefs.current &&
    rankingListRefs.current[index];

  const handleRectangleButtonClick = (rank: number) => (): void => {
    const position = 4;

    return rank - position >= position
      ? rankingListRefs.current[rank - position]!.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      : handleTop10ButtonClick();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsRankingInView(entries[0].isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (isRankingListRefsExist(rank)) {
      observer.observe(rankingListRefs.current[rank]!);
    }

    return () => {
      if (isRankingListRefsExist(rank)) {
        observer.unobserve(rankingListRefs.current[rank]!);
      }
    };
  }, [rankingListRefs]);

  return {
    isRankInView,
    handleTop10ButtonClick,
    handleRectangleButtonClick,
  };
};

export default useButtonField;
