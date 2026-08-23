export function HomeTechnicalMotif() {
  return (
    <div className="home-technical-motif" aria-hidden="true">
      <svg
        className="home-technical-motif-svg home-technical-motif-svg--desktop"
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className="home-technical-grid">
          <path d="M80 0V620M240 0V620M400 0V620M560 0V620M720 0V620M880 0V620M1040 0V620M1200 0V620M1360 0V620" />
          <path d="M0 82H1440M0 202H1440M0 322H1440M0 442H1440M0 562H1440" />
        </g>

        <g className="home-technical-contours">
          <path d="M1010 22C1138 -22 1324 15 1402 111C1480 207 1423 344 1295 388C1167 432 988 385 931 278C874 171 882 66 1010 22Z" />
          <path d="M1044 65C1144 31 1289 53 1351 126C1413 199 1369 302 1269 337C1169 372 1030 337 984 255C938 173 944 99 1044 65Z" />
          <path d="M1081 109C1154 83 1259 98 1305 151C1351 204 1319 276 1246 301C1173 326 1074 301 1040 242C1006 183 1008 135 1081 109Z" />
          <path d="M1117 151C1164 134 1233 143 1262 177C1291 211 1271 255 1224 272C1177 289 1114 273 1092 236C1070 199 1070 168 1117 151Z" />
        </g>

        <path
          className="home-technical-signal"
          d="M358 118H495L520 92L546 145L573 72L600 118H748C790 118 803 93 843 93H952C994 93 1008 118 1050 118H1372"
        />

        <g className="home-technical-axis">
          <path d="M358 92V144M348 118H368" />
          <path d="M1372 92V144M1362 118H1382" />
        </g>

        <g className="home-technical-points">
          <circle className="home-technical-point-halo" cx="748" cy="118" r="12" />
          <circle className="home-technical-point home-technical-point--measurement" cx="748" cy="118" r="4.5" />
          <circle className="home-technical-point-halo" cx="952" cy="93" r="12" />
          <circle className="home-technical-point home-technical-point--studies" cx="952" cy="93" r="4.5" />
          <circle className="home-technical-point-halo" cx="1180" cy="118" r="12" />
          <circle className="home-technical-point home-technical-point--docs" cx="1180" cy="118" r="4.5" />
        </g>

        <g className="home-technical-crosshair">
          <circle cx="1247" cy="226" r="68" />
          <circle cx="1247" cy="226" r="22" />
          <path d="M1158 226H1336M1247 137V315" />
        </g>
      </svg>

      <svg
        className="home-technical-motif-svg home-technical-motif-svg--mobile"
        viewBox="0 0 390 1160"
        preserveAspectRatio="xMidYMin slice"
        focusable="false"
      >
        <g className="home-technical-contours">
          <path d="M269 -15C348 -34 421 14 438 84C455 154 407 221 328 240C249 259 179 216 166 145C153 74 190 4 269 -15Z" />
          <path d="M285 22C342 8 394 42 406 92C418 142 384 188 327 202C270 216 220 185 211 134C202 83 228 36 285 22Z" />
          <path d="M302 60C335 52 366 71 373 100C380 129 360 156 327 164C294 172 265 154 260 124C255 94 269 68 302 60Z" />
        </g>
        <path
          className="home-technical-signal"
          d="M186 94H222L232 79L244 112L258 62L272 94H350"
        />
        <g className="home-technical-points">
          <circle className="home-technical-point home-technical-point--measurement" cx="222" cy="94" r="4" />
          <circle className="home-technical-point home-technical-point--studies" cx="286" cy="94" r="4" />
          <circle className="home-technical-point home-technical-point--docs" cx="350" cy="94" r="4" />
        </g>
        <g className="home-technical-crosshair">
          <circle cx="327" cy="124" r="38" />
          <path d="M276 124H378M327 73V175" />
        </g>
      </svg>
    </div>
  );
}
