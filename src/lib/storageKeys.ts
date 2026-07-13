// Centralized localStorage keys used across the app's mock-persistence hooks.
export const STORAGE_KEYS = {
  profile: "aiw:profile",
  isLoggedIn: "aiw:is-logged-in",
  theme: "aiw:theme",
} as const;

export const DEFAULT_PROFILE = {
  name: "Alex Morgan",
  role: "Product Manager",
  team: "Growth",
  website: "",
  avatarDataUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOGI1Y2Y2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNiZykiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzgiIGZpbGw9IiNmZGU4ZDAiLz4KICA8cGF0aCBkPSJNMTAwIDExOGMtMzggMC02MiAyMi02OCA1OC0xIDYgMyAxMiA5IDEyaDExOGM2IDAgMTAtNiA5LTEyLTYtMzYtMzAtNTgtNjgtNTh6IiBmaWxsPSIjZmRlOGQwIi8+CiAgPHBhdGggZD0iTTYyIDc4YzAtMjQgMTctNDIgMzgtNDJzMzggMTggMzggNDJjMCA0LTEgOC0yIDEyLTQtMTAtMTQtMTgtMjYtMThoLTIwYy04IDAtMTUgNi0xNyAxNC02LTItMTEtNi0xMS04eiIgZmlsbD0iIzRiMzYyMSIvPgo8L3N2Zz4K",
};
