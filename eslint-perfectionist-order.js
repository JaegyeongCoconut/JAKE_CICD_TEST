const propsOrder = {
  customGroups: {
    reference: ["^key$", "ref$"],
    identity: ["^id$", "^name$"],
    polymorphic: ["^as$"],
    accessibility: ["^role$", "^aria-.*"],
    dataset: ["^data-.*"],
    variant: ["variant", "color$", "size"],
    stateFlags: ["^has.*", "^is.*", "^checked$", "^disabled$", "^open$"],
    value: ["^defaultValue$", "^value$"],
    reactHookForm: ["^register$", "^control$", "^render$"],
    layout: [
      "^position$",
      "^grid.*",
      "^gap$",
      "width$",
      "height$",
      "^margin.*",
      "^padding.*",
      "^zIndex$",
    ],
    css: ["^css$"],
    style: ["^className$", "^style$"],
    handlers: ["^on.*", "^handle.*", "mutationFn$", "queryFn$"],
    children: ["^children$"],
    dangerous: ["^dangerouslySetInnerHTML$"],
    others: [
      "^(?!^key$)(?!^ref$)" +
        "(?!^id$)(?!^name$)" +
        "(?!^as$)" +
        "(?!^role$)(?!^aria-.*)" +
        "(?!^data-.*)" +
        "(?!^variant$)(?!^color$)(?!^size$)" +
        "(?!^has.*)(?!^is.*)(?!^checked$)(?!^disabled$)(?!^open$)" +
        "(?!^defaultValue$)(?!^value$)" +
        "(?!^register$)(?!^control$)(?!^render$)" +
        "(?!^position$)(?!^grid.*)(?!^gap$)(?!^width$)(?!^height$)(?!^margin.*)(?!^padding.*)(?!^zIndex$)" +
        "(?!^css$)(?!^className$)(?!^style$)" +
        "(?!^on.*)(?!^handle.*)(?!mutationFn$)(?!queryFn$)" +
        "(?!^children$)" +
        "(?!^dangerouslySetInnerHTML$).*",
    ],
  },
  groups: [
    "css",
    "style",
    "reference",
    "identity",
    "polymorphic",
    "accessibility",
    "dataset",
    "variant",
    "stateFlags",
    "value",
    "layout",
    "others",
    "reactHookForm",
    "dangerous",
    "handlers",
    "children",
  ],
  order: "asc",
  type: "natural",
};

export default propsOrder;
