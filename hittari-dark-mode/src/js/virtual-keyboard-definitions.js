export const inlineShortcuts = {
    xx: { mode: "math", value: "xx" },
    in: { mode: "math", value: "in" },
    dx: { mode: "math", value: "dx" },
    dy: { mode: "math", value: "dy" },
    dt: { mode: "math", value: "dt" },
    "/": { mode: "math", value: "\\frac{#@}{#0}" },
    "(": { mode: "math", value: "\\left(#0\\right)" },
    "*": { mode: "math", value: "\\cdot"},
    lim: {
        mode: "math",
        value: "\\lim_{#1\\to#2}\\left{#0}\\right",
    },
};

export const keybindings = [
    {
        key: "left",
        command: "moveToPreviousChar",
    },
    {
        key: "right",
        command: "moveToNextChar",
    },
    {
        key: "up",
        command: "moveUp",
    },
    {
        key: "down",
        command: "moveDown",
    },
    {
        key: "shift+[ArrowLeft]",
        command: "extendSelectionBackward",
    },
    {
        key: "shift+[ArrowRight]",
        command: "extendSelectionForward",
    },
    {
        key: "shift+[ArrowUp]",
        command: "extendSelectionUpward",
    },
    {
        key: "shift+[ArrowDown]",
        command: "extendSelectionDownward",
    },
    {
        key: "[Backspace]",
        command: "deleteBackward",
    },
    {
        key: "alt+[Delete]",
        command: "deleteBackward",
    },
    {
        key: "[Delete]",
        command: "deleteForward",
    },
    {
        key: "alt+[Backspace]",
        command: "deleteForward",
    },
    {
        key: "alt+[ArrowLeft]",
        command: "moveToPreviousWord",
    },
    {
        key: "alt+[ArrowRight]",
        command: "moveToNextWord",
    },
    {
        key: "shift+alt+[ArrowLeft]",
        command: "extendToPreviousWord",
    },
    {
        key: "shift+alt+[ArrowRight]",
        command: "extendToNextWord",
    },
    {
        key: "ctrl+[ArrowLeft]",
        command: "moveToGroupStart",
    },
    {
        key: "ctrl+[ArrowRight]",
        command: "moveToGroupEnd",
    },
    {
        key: "shift+ctrl+[ArrowLeft]",
        command: "extendToGroupStart",
    },
    {
        key: "shift+ctrl+[ArrowRight]",
        command: "extendToGroupEnd",
    },
    {
        key: "[Space]",
        ifMode: "math",
        command: "moveAfterParent",
    },
    {
        key: "shift+[Space]",
        ifMode: "math",
        command: "moveBeforeParent",
    },
    {
        key: "[Home]",
        command: "moveToMathFieldStart",
    },
    {
        key: "cmd+[ArrowLeft]",
        command: "moveToMathFieldStart",
    },
    {
        key: "shift+[Home]",
        command: "extendToMathFieldStart",
    },
    {
        key: "shift+cmd+[ArrowLeft]",
        command: "extendToMathFieldStart",
    },
    {
        key: "[End]",
        command: "moveToMathFieldEnd",
    },
    {
        key: "cmd+[ArrowRight]",
        command: "moveToMathFieldEnd",
    },
    {
        key: "shift+[End]",
        command: "extendToMathFieldEnd",
    },
    {
        key: "shift+cmd+[ArrowRight]",
        command: "extendToMathFieldEnd",
    },
    {
        key: "[Pageup]",
        command: "moveToGroupStart",
    },
    {
        key: "[Pagedown]",
        command: "moveToGroupEnd",
    },
    {
        key: "[Tab]",
        ifMode: "math",
        command: "moveToNextPlaceholder",
    },
    {
        key: "shift+[Tab]",
        ifMode: "math",
        command: "moveToPreviousPlaceholder",
    },
    {
        key: "[Tab]",
        ifMode: "text",
        command: "moveToNextPlaceholder",
    },
    {
        key: "shift+[Tab]",
        ifMode: "text",
        command: "moveToPreviousPlaceholder",
    },
    {
        key: "[Escape]",
        ifMode: "math",
        command: ["switchMode", "latex"],
    },
    {
        key: "[Escape]",
        ifMode: "text",
        command: ["switchMode", "latex"],
    },
    {
        key: "\\",
        ifMode: "math",
        command: ["switchMode", "latex", "\\"],
    },
    {
        key: "[Escape]",
        ifMode: "latex",
        command: [
            "complete",
            "complete",
            {
                selectItem: "true",
            },
        ],
    },
    {
        key: "[Tab]",
        ifMode: "latex",
        command: ["complete", "accept-suggestion"],
    },
    {
        key: "[Return]",
        ifMode: "latex",
        command: "complete",
    },
    {
        key: "[Enter]",
        ifMode: "latex",
        command: "complete",
    },
    {
        key: "shift+[Escape]",
        ifMode: "latex",
        command: ["complete", "reject"],
    },
    {
        key: "[ArrowDown]",
        ifMode: "latex",
        command: "nextSuggestion",
    },
    {
        key: "[ArrowUp]",
        ifMode: "latex",
        command: "previousSuggestion",
    },
    {
        key: "ctrl+a",
        ifPlatform: "!macos",
        command: "selectAll",
    },
    {
        key: "cmd+a",
        command: "selectAll",
    },
    {
        key: "[Cut]",
        command: "cutToClipboard",
    },
    {
        key: "[Copy]",
        command: "copyToClipboard",
    },
    {
        key: "[Paste]",
        command: "pasteFromClipboard",
    },
    {
        key: "[Clear]",
        command: "deleteBackward",
    },
    {
        key: "ctrl+z",
        ifPlatform: "!macos",
        command: "undo",
    },
    {
        key: "cmd+z",
        command: "undo",
    },
    {
        key: "[Undo]",
        command: "undo",
    },
    {
        key: "ctrl+y",
        ifPlatform: "!macos",
        command: "redo",
    },
    {
        key: "shift+cmd+y",
        command: "redo",
    },
    {
        key: "shift+ctrl+z",
        ifPlatform: "!macos",
        command: "redo",
    },
    {
        key: "shift+cmd+z",
        command: "redo",
    },
    {
        key: "[Redo]",
        command: "redo",
    },
    {
        key: "[EraseEof]",
        command: "deleteToGroupEnd",
    },
    {
        key: "ctrl+b",
        ifPlatform: "macos",
        command: "moveToPreviousChar",
    },
    {
        key: "ctrl+f",
        ifPlatform: "macos",
        command: "moveToNextChar",
    },
    {
        key: "ctrl+p",
        ifPlatform: "macos",
        command: "moveUp",
    },
    {
        key: "ctrl+n",
        ifPlatform: "macos",
        command: "moveDown",
    },
    {
        key: "ctrl+a",
        ifPlatform: "macos",
        command: "moveToMathFieldStart",
    },
    {
        key: "ctrl+e",
        ifPlatform: "macos",
        command: "moveToMathFieldEnd",
    },
    {
        key: "shift+ctrl+b",
        ifPlatform: "macos",
        command: "extendSelectionBackward",
    },
    {
        key: "shift+ctrl+f",
        ifPlatform: "macos",
        command: "extendSelectionForward",
    },
    {
        key: "shift+ctrl+p",
        ifPlatform: "macos",
        command: "extendSelectionUpward",
    },
    {
        key: "shift+ctrl+n",
        ifPlatform: "macos",
        command: "extendSelectionDownward",
    },
    {
        key: "shift+ctrl+a",
        ifPlatform: "macos",
        command: "extendToMathFieldStart",
    },
    {
        key: "shift+ctrl+e",
        ifPlatform: "macos",
        command: "extendToMathFieldEnd",
    },
    {
        key: "alt+ctrl+b",
        ifPlatform: "macos",
        command: "moveToPreviousWord",
    },
    {
        key: "alt+ctrl+f",
        ifPlatform: "macos",
        command: "moveToNextWord",
    },
    {
        key: "shift+alt+ctrl+b",
        ifPlatform: "macos",
        command: "extendToPreviousWord",
    },
    {
        key: "shift+alt+ctrl+f",
        ifPlatform: "macos",
        command: "extendToNextWord",
    },
    {
        key: "ctrl+h",
        ifPlatform: "macos",
        command: "deleteBackward",
    },
    {
        key: "ctrl+d",
        ifPlatform: "macos",
        command: "deleteForward",
    },
    {
        key: "ctrl+l",
        ifPlatform: "macos",
        command: "scrollIntoView",
    },
    {
        key: "ctrl+[Digit2]",
        ifMode: "math",
        command: ["insert", "$$\\sqrt{#0}$$"],
    },
    {
        key: "ctrl+[Digit5]",
        ifMode: "math",
        command: "moveToOpposite",
    },
    {
        key: "ctrl+[Digit6]",
        ifMode: "math",
        command: "moveToSuperscript",
    },
    {
        key: "ctrl+[Return]",
        ifMode: "math",
        command: "addRowAfter",
    },
    {
        key: "ctrl+[Enter]",
        ifMode: "math",
        command: "addRowAfter",
    },
    {
        key: "cmd+[Return]",
        ifMode: "math",
        command: "addRowAfter",
    },
    {
        key: "cmd+[Enter]",
        ifMode: "math",
        command: "addRowAfter",
    },
    {
        key: "alt+p",
        ifMode: "math",
        command: ["insert", "$$\\pi$$"],
    },
    {
        key: "alt+v",
        ifMode: "math",
        command: ["insert", "$$\\sqrt{#0}$$"],
    },
    {
        key: "alt+w",
        ifMode: "math",
        command: ["insert", "$$\\sum_{i=#?}^{#?}$$"],
    },
    {
        key: "alt+b",
        command: ["insert", "$$\\int_{#?}^{#?}$$"],
    },
    {
        key: "alt+u",
        ifMode: "math",
        command: ["insert", "$$\\cup$$"],
    },
    {
        key: "alt+n",
        ifMode: "math",
        command: ["insert", "$$\\cap$$"],
    },
    {
        key: "alt+o",
        ifMode: "math",
        command: ["insert", "$$\\emptyset$$"],
    },
    {
        key: "shift+alt+o",
        ifMode: "math",
        command: ["insert", "$$\\varnothing$$"],
    },
    {
        key: "shift+alt+d",
        ifMode: "math",
        command: ["insert", "$$\\partial$$"],
    },
    {
        key: "shift+alt+p",
        ifMode: "math",
        command: ["insert", "$$\\prod_{i=#?}^{#?}$$"],
    },
    {
        key: "shift+alt+u",
        ifMode: "math",
        command: ["insert", "$$\\bigcup$$"],
    },
    {
        key: "shift+alt+n",
        ifMode: "math",
        command: ["insert", "$$\\bigcap$$"],
    },
    {
        key: "shift+alt+a",
        ifMode: "math",
        command: ["insert", "$$\\forall$$"],
    },
    {
        key: "shift+alt+e",
        ifMode: "math",
        command: ["insert", "$$\\exists$$"],
    },
    {
        key: "alt+[Backslash]",
        ifMode: "math",
        command: ["insert", "$$\\backslash$$"],
    },
    {
        key: "[NumpadDivide]",
        ifMode: "math",
        command: ["insert", "$$\\frac{#@}{#?}$$"],
    },
    {
        key: "alt+[NumpadDivide]",
        ifMode: "math",
        command: ["insert", "\\frac{#?}{#@}"],
    },
    {
        key: "shift+alt+k",
        command: "toggleKeystrokeCaption",
    },
    {
        key: "alt+[Space]",
        command: "toggleVirtualKeyboard",
    },
    {
        key: "alt+ctrl+[ArrowUp]",
        command: [
            "speak",
            "all",
            {
                withHighlighting: false,
            },
        ],
    },
    {
        key: "alt+ctrl+[ArrowDown]",
        command: [
            "speak",
            "selection",
            {
                withHighlighting: false,
            },
        ],
    },
    {
        key: "alt+[Equal]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: [
            "applyStyle",
            {
                mode: "text",
            },
        ],
    },
    {
        key: "alt+[Equal]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "text",
        command: [
            "applyStyle",
            {
                mode: "math",
            },
        ],
    },
    {
        key: "shift+[Quote]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["switchMode", "text", "", "“"],
    },
    {
        key: "shift+[Quote]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "text",
        command: ["switchMode", "math", "”", ""],
    },
    {
        key: "alt+/",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$$\\/$$"],
    },
    {
        key: "alt+[BracketLeft]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$$\\left\\lbrack #0 \\right\\rbrack$$"],
    },
    {
        key: "ctrl+[Minus]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "moveToSubscript",
    },
    {
        key: "shift+alt+[BracketLeft]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$$\\left\\lbrace #0 \\right\\rbrace$$"],
    },
    {
        key: "ctrl+;",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addRowAfter",
    },
    {
        key: "cmd+;",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addRowAfter",
    },
    {
        key: "shift+ctrl+;",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addRowBefore",
    },
    {
        key: "shift+cmd+;",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addRowBefore",
    },
    {
        key: "ctrl+[Comma]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addColumnAfter",
    },
    {
        key: "cmd+[Comma]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addColumnAfter",
    },
    {
        key: "shift+ctrl+[Comma]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addColumnAfter",
    },
    {
        key: "shift+cmd+[Comma]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: "addColumnAfter",
    },
    {
        key: "alt+[Digit5]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$\\infty$$"],
    },
    {
        key: "alt+[Digit6]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$$\\wedge$$"],
    },
    {
        key: "shift+alt+[Digit6]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$$\\vee$$"],
    },
    {
        key: "alt+[Digit9]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "("],
    },
    {
        key: "alt+[Digit0]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", ")"],
    },
    {
        key: "alt+|",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "|"],
    },
    {
        key: "shift+[Backquote]",
        ifLayout: ["apple.en-intl", "windows.en-intl", "linux.en"],
        ifMode: "math",
        command: ["insert", "$$\\~$$"],
    },
];

export const customVirtualKeyboardLayers = {
    "custom-kaavio-numbers": {
        styles: "",
        rows: [
            [
                { latex: "x" },
                { class: "separator w5" },
                { label: "7", key: "7" },
                { label: "8", key: "8" },
                { label: "9", key: "9" },

                { label: "÷", insert: "\\frac{#@}{#0}" },

                { class: "separator w5" },
                {
                    class: "tex small",
                    label: "<span><i>x</i>&thinsp;²</span>",
                    insert: "$$#@^{2}$$",
                },
                {
                    class: "tex small",
                    label: "<span><i>x</i><sup>&thinsp;<i>n</i></sup></span>",
                    insert: "$$#@^{#0}$$",
                },
                { class: "separator" },
            ],
            [
                { class: "separator" },

                { class: "separator w5" },
                { label: "4", key: "4" },
                { label: "5", key: "5" },
                { label: "6", key: "6" },
                { label: "×", insert: "\\cdot" },
                { class: "separator w5" },
                { class: "small", latex: "\\frac{#@}{#0}" },
                {
                    class: "small",
                    latex: "\\sqrt{#0}",
                    insert: "$$\\sqrt{#0}$$",
                },
                { class: "separator" },
            ],
            [
                { latex: "\\pi" },

                { class: "separator w5" },
                { label: "1", key: "1" },
                { label: "2", key: "2" },
                { label: "3", key: "3" },
                { latex: "-" },
                { class: "separator w5" },
                { latex: "(", insert: "\\left(#0\\right)" },
                { latex: ")" },
                { class: "separator" },
            ],
            [
                { latex: "e" },

                { class: "separator w5" },
                { label: "=", key: "=" },
                { label: "0", key: "0" },
                { latex: "." },
                { latex: "+" },
                { class: "separator w5" },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"],
                },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"],
                },
                {
                    class: "action font-glyph bottom right",
                    label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"],
                },
            ],
        ],
    },
    "custom-kaavio-functions": {
        styles: "",
        rows: [
            [
                { class: "small", latex: "x" },

                { class: "separator w5" },

                {
                    class: "small",
                    latex: "sin",
                    insert: "\\sin\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "cos",
                    insert: "\\cos\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "tan",
                    insert: "\\tan\\left({#0}\\right)",
                },

                { class: "separator w5" },

                { class: "small", latex: "log", insert: "\\log({#0},{#0})" },
                {
                    class: "small",
                    latex: "ln",
                    insert: "ln\\left({#0}\\right)",
                },
                { class: "small", latex: "\\left|{#0}\\right|" },
            ],
            [
                { class: "small", latex: "n" },
                { class: "separator w5" },

                {
                    class: "small",
                    latex: "sin^{-1}",
                    insert: "\\arcsin\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "cos^{-1}",
                    insert: "\\arccos\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "tan^{-1}",
                    insert: "\\arctan\\left({#0}\\right)",
                },

                { class: "separator w5" },

                {
                    class: "small",
                    latex: "min",
                    insert: "\\min\\left({#0},{#0}\\right)",
                },
                {
                    class: "small",
                    latex: "max",
                    insert: "\\max\\left({#0},{#0}\\right)",
                },
                {
                    class: "small",
                    latex: "\\sqrt[n]{#0}",
                    insert: "nthroot\\left({#0},{#0}\\right)",
                },
            ],
            [
                { class: "small", latex: "\\pi" },
                { class: "separator w5" },

                {
                    class: "small",
                    latex: "sinh",
                    insert: "\\sinh\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "cosh",
                    insert: "\\cosh\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "tanh",
                    insert: "\\tanh\\left({#0}\\right)",
                },

                { class: "separator w5" },

                { class: "separator" },
                { class: "separator" },
                { class: "separator" },
            ],
            [
                { class: "small", latex: "e" },
                { class: "separator w5" },

                {
                    class: "small",
                    latex: "sec",
                    insert: "\\sec\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "csc",
                    insert: "\\csc\\left({#0}\\right)",
                },
                {
                    class: "small",
                    latex: "cot",
                    insert: "\\cot\\left({#0}\\right)",
                },

                { class: "separator w5" },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"],
                },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"],
                },
                {
                    class: "action font-glyph bottom right",
                    label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"],
                },
            ],
        ],
    },
    "custom-mathlive-numbers": {
        styles: "",
        rows: [
            [
                { latex: "x" },
                { class: "separator w5" },
                { label: "7", key: "7" },
                { label: "8", key: "8" },
                { label: "9", key: "9" },

                { label: "÷", insert: "\\frac{#@}{#0}" },

                { class: "separator w5" },
                {
                    latex: "e^x",
                },
                {
                    latex: "x^{n}",
                    insert: "{#@}^{#0}",
                },
                { class: "separator" },
            ],
            [
                { latex: "n" },

                { class: "separator w5" },
                { label: "4", key: "4" },
                { label: "5", key: "5" },
                { label: "6", key: "6" },
                { label: "×", insert: "\\cdot" },
                { class: "separator w5" },
                { class: "small", latex: "\\frac{#@}{#0}" },
                {
                    class: "small",
                    latex: "\\sqrt{#0}",
                    insert: "$$\\sqrt{#0}$$",
                },
                { class: "separator" },
            ],
            [
                { latex: "\\pi" },

                { class: "separator w5" },
                { label: "1", key: "1" },
                { label: "2", key: "2" },
                { label: "3", key: "3" },
                { latex: "-" },
                { class: "separator w5" },
                { latex: "(", insert: "\\left(#0\\right)" },
                { latex: ")" },
                { class: "separator" },
            ],
            [
                { latex: "e" },

                { class: "separator w5" },
                { label: "=", key: "=" },
                { label: "0", key: "0" },
                { latex: "." },
                { latex: "+" },
                { class: "separator w5" },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"],
                },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"],
                },
                {
                    class: "action font-glyph bottom right",
                    label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"],
                },
            ],
        ],
    },
    "custom-mathlive-functions": {
        styles: "",
        rows: [
            [
                {
                    class: "small",
                    latex: "\\sin",
                    insert: "\\sin\\left{#0\\right}",
                },
                {
                    class: "small",
                    latex: "\\sin^{-1}",
                    insert: "\\sin^{-1}\\left{#0\\right}",
                },
                {
                    class: "small",
                    latex: "\\ln",
                    insert: "\\ln\\left{#0\\right}",
                },
                { class: "small", latex: "e^{#0}", insert: "e^{#0}" },
                {
                    class: "small",
                    latex: "lcm",
                    insert: "lcm\\left(#0\\right)",
                },
                {
                    class: "small",
                    latex: "ceil",
                    insert: "ceil\\left(#0\\right)",
                },
                {
                    class: "small",
                    latex: "\\lim_{n\\to\\infty}",
                    insert: "\\lim_{n\\to\\infty}\\left{#0}\\right",
                },
                {
                    class: "small",
                    latex: "\\int",
                    insert: "\\int",
                    variants: ["\\iint", "\\iiint", "\\oint_C"],
                },
                { class: "small", latex: "|#0|", insert: "\\left|#0\\right|" },
            ],
            [
                {
                    class: "small",
                    latex: "\\cos",
                    insert: "\\cos\\left{#0\\right}",
                },
                {
                    class: "small",
                    latex: "\\cos^{-1}",
                    insert: "\\cos^{-1}\\left{#0\\right}",
                },
                {
                    class: "small",
                    latex: "\\ln_{10}",
                    insert: "\\ln_{10}\\left{#0\\right}",
                },
                { class: "small", latex: "10^{#0}", insert: "10^{#0}" },
                {
                    class: "small",
                    latex: "gcd",
                    insert: "gcd\\left(#0\\right)",
                },
                {
                    class: "small",
                    latex: "floor",
                    insert: "floor\\left(#0\\right)",
                },
                { class: "small", latex: "\\sum_{n\\to 0}^{\\infty}" },
                { class: "small", latex: "\\int_0^{\\infty}" },
                {
                    class: "small",
                    latex: "sign",
                    insert: "sign\\left(#0\\right)",
                },
            ],
            [
                {
                    class: "small",
                    latex: "\\tan",
                    insert: "\\tan\\left{#0\\right}",
                },
                {
                    class: "small",
                    latex: "\\tan^{-1}",
                    insert: "\\tan^{-1}\\left{#0\\right}",
                },
                { class: "small", latex: "log", insert: "\\log_{#0}" },
                { class: "small", latex: "\\sqrt{#0}" },
                { class: "small", latex: "mod", insert: "\\mod" },
                {
                    class: "small",
                    latex: "round",
                    insert: "round\\left(#0\\right)",
                },
                {
                    class: "small",
                    latex: "\\prod_{n\\to 0}^{\\infty}",
                    variants: ["\\coprod_{n\\to 0}^{\\infty}"],
                },
                { class: "small", latex: "\\frac{d\\left{#0\\right}}{dx}" },
                { class: "small", latex: "x" },
            ],
            [
                { class: "small", label: "(", insert: "\\left(#0\\right)" },
                { class: "small", label: ")" },
                { class: "small", latex: "x^n", insert: "{#@}^{#0}" },
                { class: "small", latex: "x_n", insert: "{#@}_{#0}" },
                { class: "w20", insert: "\\:" },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"],
                },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"],
                },
                {
                    class: "action font-glyph bottom right",
                    label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"],
                },
            ],
        ],
    },
    "custom-mathlive-letters": {
        styles: "",
        rows: [
            [
                { label: "q" },
                { label: "w" },
                { label: "e" },
                { label: "r" },
                { label: "t" },
                { label: "y" },
                { label: "u" },
                { label: "i" },
                { label: "o" },
                { label: "p" },
            ],
            [
                { label: "a" },
                { label: "s" },
                { label: "d" },
                { label: "f" },
                { label: "g" },
                { label: "h" },
                { label: "j" },
                { label: "k" },
                { label: "l" },
            ],
            [
                { label: "z" },
                { label: "x" },
                { label: "c" },
                { label: "v" },
                { label: "b" },
                { label: "n" },
                { label: "m" },
            ],
            [
                {
                    class: "separator",
                    label: "<li class='shift modifier font-glyph bottom left w15 layer-switch' data-layer='custom-mathlive-letters-capital'>&#x21e7;</li>",
                },
                { class: "w50", label: "0", latex: "\\:" },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"],
                },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"],
                },
                {
                    class: "action font-glyph bottom right",
                    label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"],
                },
                { class: "separator w5" },
            ],
        ],
    },
    "custom-mathlive-letters-capital": {
        styles: "",
        rows: [
            [
                { label: "Q" },
                { label: "W" },
                { label: "E" },
                { label: "R" },
                { label: "T" },
                { label: "Y" },
                { label: "U" },
                { label: "I" },
                { label: "O" },
                { label: "P" },
            ],
            [
                { label: "A" },
                { label: "S" },
                { label: "D" },
                { label: "F" },
                { label: "G" },
                { label: "H" },
                { label: "J" },
                { label: "K" },
                { label: "L" },
            ],
            [
                { label: "Z" },
                { label: "X" },
                { label: "C" },
                { label: "V" },
                { label: "B" },
                { label: "N" },
                { label: "M" },
            ],
            [
                {
                    class: "separator",
                    label: "<li class='shift modifier font-glyph bottom left w15 layer-switch' data-layer='custom-mathlive-letters'>&#x21e7;</li>",
                },
                { class: "w50", label: "0", latex: "\\:" },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                    command: ["performWithFeedback", "moveToPreviousChar"],
                },
                {
                    class: "action",
                    label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                    command: ["performWithFeedback", "moveToNextChar"],
                },
                {
                    class: "action font-glyph bottom right",
                    label: "&#x232b;",
                    command: ["performWithFeedback", "deleteBackward"],
                },
                { class: "separator w5" },
            ],
        ],
    },
};
