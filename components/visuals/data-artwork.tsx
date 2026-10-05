import { Cloud, Code2, Database, FileText, Settings, UsersRound } from "lucide-react";
import type { Locale } from "@/i18n/config";

const navy = "var(--brand-primary)";
const teal = "var(--brand-secondary)";
const green = "var(--brand-quality)";
const lime = "var(--brand-tertiary)";
const orange = "var(--brand-action)";
const white = "var(--surface)";

/** Share the supplied native vector across illustrations at their existing sizes. */
function IllustrationOwl({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <image href="/brand/illustration-owl.svg" x={x} y={y} width={width} height={height} />
  );
}

function Bars({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    {[36, 64, 48, 89, 74, 111].map((height, i) => <rect key={i} x={i * 28} y={120 - height} width="17" height={height} rx="3" fill={[teal, green, teal, green, lime, orange][i]} />)}
  </g>;
}

function Donut({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y}) rotate(-90)`} fill="none" strokeWidth="15">
    <circle r="31" stroke={teal} />
    <circle r="31" stroke={green} strokeDasharray="76 195" />
    <circle r="31" stroke={orange} strokeDasharray="32 195" strokeDashoffset="-76" />
  </g>;
}

function DashboardDrawing() {
  return <g>
    <rect width="400" height="235" rx="18" fill={white} stroke={teal} strokeWidth="2" />
    <path d="M0 37H400" stroke={teal} />
    {[18, 32, 46].map(x => <circle key={x} cx={x} cy="19" r="3" fill={teal} />)}
    <rect x="265" y="15" width="110" height="6" rx="3" fill={teal} />
    <rect x="15" y="49" width="198" height="171" rx="10" fill="none" stroke={teal} />
    <rect x="228" y="49" width="153" height="95" rx="10" fill="none" stroke={teal} />
    <rect x="228" y="154" width="153" height="66" rx="10" fill="none" stroke={teal} />
    <path d="M25 76H94M25 87H65" stroke={teal} strokeWidth="5" strokeLinecap="round" />
    <Bars x={24} y={78} />
    <path d="M25 161L61 138L94 146L126 111L157 122L190 84" fill="none" stroke={navy} strokeWidth="4" strokeLinejoin="round" />
    {[[25,161],[61,138],[94,146],[126,111],[157,122],[190,84]].map(([x,y],i)=><circle key={x} cx={x} cy={y} r="5" fill={i===5?orange:green} stroke={white} strokeWidth="2" />)}
    <g transform="translate(305 97) scale(.85)"><Donut x={0} y={0} /></g>
    {[76, 56, 88].map((width,i)=><rect key={i} x="244" y={165+i*16} width={width} height="6" rx="3" fill={[teal,green,lime][i]} />)}
    <path d="M24 213H197" stroke={teal} />
  </g>;
}


function HeroReport() {
  const heights = [24, 38, 54, 45, 78, 68, 99, 117];
  const points = [[77, 182], [112, 158], [147, 152], [182, 127], [217, 138], [252, 101], [287, 97], [322, 69]];
  return (
    <g>
      <rect width="370" height="268" rx="16" fill={white} stroke={teal} strokeWidth="1.5" />
      <path d="M1 35H369M49 35V267" stroke={teal} strokeWidth="1" />
      {[orange, lime, green].map((colour, i) => <circle key={colour} cx={20 + i * 13} cy="18" r="4" fill={colour} />)}
      <path d="M72 59H145M72 72H118" stroke={teal} strokeWidth="5" strokeLinecap="round" />
      <path d="M15 76L25 67L35 76V88H28V81H22V88H15Z" fill={navy} />
      {[10, 16, 23].map((height, i) => <rect key={i} x={15 + i * 8} y={132 - height} width="5" height={height} rx="1" fill={[green, teal, lime][i]} />)}
      <Database x="14" y="156" size={22} color={teal} strokeWidth={1.7} />
      <Settings x="14" y="203" size={22} color={teal} strokeWidth={1.7} />
      {[104, 141, 178, 215].map(y => <path key={y} d={`M66 ${y}H347`} stroke={teal} strokeWidth="0.5" />)}
      {heights.map((height, i) => <rect key={i} x={68 + i * 35} y={216 - height} width="20" height={height} rx="3" fill={[lime, teal, green, navy, teal, lime, green, teal][i]} />)}
      <polyline points={points.map(point => point.join(",")).join(" ")} fill="none" stroke={orange} strokeWidth="3.5" strokeLinejoin="round" />
      {points.map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill={orange} />)}
      {[76, 123, 170, 217, 264, 311].map(x => <rect key={x} x={x} y="234" width="20" height="4" rx="2" fill={teal} />)}
    </g>
  );
}

/** Layered, abstract analytics; no invented metrics or client data. */
function HeroComposition({ className }: { className: string }) {
  return (
    <svg className={["data-artwork", className].join(" ")} viewBox="0 0 600 560" aria-hidden="true" focusable="false">
      <path d="M105 278C91 192 157 112 254 131C328 70 426 91 487 153C564 227 535 336 467 411C357 508 141 452 105 278Z" fill={teal} />
      <path d="M136 324C197 271 280 328 351 332C422 324 473 348 476 398C478 459 381 501 275 494C185 486 105 427 136 324Z" fill={green} />
      {/* All stems end behind the cards or at the base of the foreground leaves. */}
      <path d="M137 368C132 265 113 169 75 103M526 446C533 396 555 344 580 299" stroke={teal} strokeWidth="2.5" fill="none" />
      <path d="M101 183C57 167 47 127 58 93C92 105 109 149 101 183Z" fill={lime} />
      <path d="M121 256C67 244 40 209 43 169C86 171 121 212 121 256Z" fill={green} />
      <path d="M134 323C88 310 51 285 46 244C90 242 132 280 134 323Z" fill={teal} />
      <path d="M545 378C535 330 552 293 579 277C590 322 569 359 545 378Z" fill={lime} />
      <path d="M535 418C550 368 573 343 594 346C594 384 569 409 535 418Z" fill={green} />
      <path d="M101 183L67 111M121 256L57 187M134 323L61 258M545 378L575 300M535 418L583 363" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" />
      <g transform="translate(91 43) rotate(-4 95 70)">
        <rect width="190" height="142" rx="14" fill={white} stroke={teal} strokeWidth="1.3" />
        <g transform="translate(63 70) scale(1.15)"><Donut x={0} y={0} /></g>
        {[navy, lime, teal].map((colour, i) => <g key={colour} fill={colour}>
          <circle cx="121" cy={49 + i * 21} r="4" />
          <rect x="134" y={46 + i * 21} width={i === 1 ? 31 : 40} height="6" rx="3" />
        </g>)}
      </g>
      <g transform="translate(409 82) rotate(-4 83 47)">
        <rect width="165" height="93" rx="14" fill={white} stroke={teal} strokeWidth="1.3" />
        <path d="M16 24H64M16 37H45" stroke={navy} strokeWidth="5" strokeLinecap="round" />
        <path d="M18 74L39 63L60 66L80 47L101 51L124 32L148 17" fill="none" stroke={teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="148" cy="17" r="4" fill={orange} />
      </g>
      <g transform="translate(117 164) rotate(-2 185 134)"><HeroReport /></g>
      <g transform="translate(32 357) rotate(4 92 70)">
        <rect width="184" height="141" rx="14" fill={white} stroke={teal} strokeWidth="1.3" />
        <path d="M19 23H84M19 36H61" stroke={teal} strokeWidth="5" strokeLinecap="round" />
        <path d="M17 101C41 53 64 72 87 100S128 61 166 67V122H17Z" fill={lime} />
        <path d="M17 109C45 103 55 72 80 95S116 64 136 59S156 90 166 82V122H17Z" fill={green} />
        <path d="M17 117C42 112 56 86 79 106S111 75 135 91S154 88 166 80V122H17Z" fill={teal} />
        <circle cx="136" cy="59" r="4.5" fill={navy} />
      </g>
      <g transform="translate(448 298) rotate(4 67 65)">
        <rect width="135" height="132" rx="14" fill={white} stroke={teal} strokeWidth="1.3" />
        <g transform="translate(48 55) scale(.83)"><Donut x={0} y={0} /></g>
        {[teal, green, lime, orange].map((colour, i) => <g key={colour} fill={colour}>
          <circle cx="92" cy={31 + i * 17} r="3" />
          <rect x="101" y={28 + i * 17} width={i === 2 ? 16 : 23} height="5" rx="2.5" />
        </g>)}
        <path d="M19 108H91" stroke={teal} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(434 414) rotate(3 73 57)">
        <rect width="146" height="115" rx="13" fill={white} stroke={teal} strokeWidth="1.3" />
        <path d="M16 19H73M16 31H43" stroke={teal} strokeWidth="4" strokeLinecap="round" />
        {[16, 28, 42, 57, 70].map((height, i) => <rect key={i} x={16 + i * 16} y={98 - height} width="10" height={height} rx="2" fill={[green, teal, lime, navy, orange][i]} />)}
        <path d="M106 51H129M106 67H123M106 83H127" stroke={teal} strokeWidth="4" strokeLinecap="round" />
      </g>
      <ellipse cx="329" cy="540" rx="139" ry="13" fill={green} />
      <path d="M268 535C222 524 189 483 193 444C237 449 264 494 268 535Z" fill={lime} />
      <path d="M259 537C214 544 174 524 161 495C204 483 242 506 259 537Z" fill={teal} />
      <path d="M393 538C390 491 417 451 451 446C453 490 428 524 393 538Z" fill={green} />
      <path d="M402 540C426 502 459 491 481 501C462 529 433 541 402 540Z" fill={teal} />
      <path d="M268 535L211 463M259 537L183 506M393 538L438 465M402 540L461 511" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" />
      <IllustrationOwl x={245} y={365} width={170} height={182} />
    </svg>
  );
}

/** Decorative samples only: no measurements or client data. */
export function DashboardArtwork({ className = "", variant = "hero" }: { className?: string; variant?: "hero" | "contact" }) {
  if (variant === "hero") return <HeroComposition className={className} />;
  return (
    <svg className={["data-artwork", className].join(" ")} viewBox="0 0 560 380" aria-hidden="true" focusable="false">
      <circle cx="333" cy="184" r="165" fill={teal} />
      <circle cx="267" cy="154" r="122" fill={lime} />
      <ellipse data-contact-background="green" cx="280" cy="245" rx="220" ry="103" transform="rotate(-18 280 245)" fill={green} />
      {/* Foliage is rooted behind the envelope and cards. */}
      <path data-contact-leaf="left" d="M153 351C97 357 47 329 27 286C86 282 137 309 153 351Z" fill={teal} />
      <path d="M428 351C417 269 442 177 492 133C501 220 466 304 428 351Z" fill={lime} />
      <path d="M438 354C455 277 490 227 535 226C529 293 484 338 438 354Z" fill={green} />
      <path data-contact-leaf="lower" d="M438 355C456 324 497 313 531 321C512 350 471 366 438 355Z" fill={teal} />
      <path d="M151 349Q97 320 48 297M431 354L479 164M438 355L516 247M440 354L512 330" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" />
      <rect x="40" y="196" width="98" height="119" rx="12" fill={white} stroke={teal} strokeWidth="1.5" />
      <g transform="translate(89 241) scale(.77)"><Donut x={0} y={0} /></g>
      <path d="M57 285H118M57 298H96" stroke={teal} strokeWidth="5" strokeLinecap="round" />
      <path d="M153 249L268 176L391 249V350H153Z" fill={navy} />
      <rect x="174" y="188" width="200" height="139" rx="12" fill={white} stroke={teal} strokeWidth="1.5" />
      <path d="M197 214H248M197 232H349M197 250H322" stroke={teal} strokeWidth="7" strokeLinecap="round" />
      <path d="M197 269H291" stroke={green} strokeWidth="7" strokeLinecap="round" />
      <path d="M153 249L257 314Q272 324 287 314L391 249V351Q391 364 378 364H166Q153 364 153 351Z" fill={white} stroke={teal} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M155 359L242 307M389 359L302 307" stroke={teal} strokeWidth="1.5" />
      <rect x="410" y="216" width="98" height="116" rx="12" fill={white} stroke={teal} strokeWidth="1.5" />
      {[19, 32, 47, 61].map((height, i) => <rect key={i} x={426 + i * 18} y={290 - height} width="12" height={height} rx="2" fill={[green, lime, teal, orange][i]} />)}
      <path d="M426 306H491M426 319H468" stroke={teal} strokeWidth="4" strokeLinecap="round" />
      <IllustrationOwl x={201} y={44} width={140} height={150} />
    </svg>
  );
}

/** Abstract report for the case-study closing banner; no client metrics. */
function SimilarNeedScene() {
  return <g>
    <path d="M149 127C170 32 267 -5 352 18C433 40 474 127 442 214L354 292L158 278Z" fill={teal} />
    <circle cx="190" cy="141" r="135" fill={lime} />
    <path d="M69 240C113 190 184 207 238 232C330 173 392 181 456 226C446 282 344 314 238 309C160 308 93 284 69 240Z" fill={green} />
    {/* Leaves grow behind the report and into the pot, never across its panels. */}
    <path d="M109 280C48 274 23 232 20 202C67 198 101 230 109 280Z" fill={green} />
    <path d="M106 269C72 235 68 183 78 151C111 172 129 228 106 269Z" fill={teal} />
    <path d="M107 279L41 218M106 267L83 176" stroke={navy} strokeWidth="2" fill="none" />
    <path d="M446 283C429 221 441 163 477 137C483 190 467 242 446 283Z" fill={lime} />
    <path d="M448 285C454 242 478 215 498 211C495 245 477 273 448 285Z" fill={green} />
    <path d="M447 287L468 164M449 280L485 231" stroke={teal} strokeWidth="2" fill="none" />
    <path d="M429 273H470L463 312H436Z" fill={white} />
    <path d="M429 273H470" stroke={teal} strokeWidth="4" />
    <g transform="translate(310 27)">
      <path d="M28 1V-10M1 13L-7 5M55 13L63 5M-7 34H-18M63 34H75" stroke={orange} strokeWidth="3" strokeLinecap="round" />
      <path d="M12 49C-9 29 3 5 27 5C52 5 64 29 43 49L39 61H16Z" fill={orange} />
      <path d="M22 59V34L15 27M32 59V34L39 27M22 34H32" fill="none" stroke={white} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 67H38M21 75H34" stroke={white} strokeWidth="3" strokeLinecap="round" />
    </g>
    <rect x="96" y="141" width="326" height="166" rx="14" fill={white} stroke={teal} strokeWidth="1.5" />
    {[teal, lime, orange].map((colour,i) => <circle key={colour} cx={111+i*12} cy="156" r="3" fill={colour} />)}
    <path d="M203 173V291M218 239H405" stroke={teal} strokeWidth="1" />
    <g transform="translate(152 217) rotate(-90)" fill="none" strokeWidth="17">
      <circle r="28" stroke={teal} />
      <circle r="28" stroke={lime} strokeDasharray="44 176" />
      <circle r="28" stroke={green} strokeDasharray="42 176" strokeDashoffset="-44" />
      <circle r="28" stroke={orange} strokeDasharray="25 176" strokeDashoffset="-86" />
    </g>
    <path d="M120 266H180M120 278H166" stroke={teal} strokeWidth="4" strokeLinecap="round" />
    {[14,31,26,50,46,65].map((height,i) => <rect key={i} x={224+i*29} y={232-height} width="18" height={height} rx="2" fill={[teal, green, lime, teal, green, orange][i]} />)}
    <path d="M233 208L262 189L291 194L320 170L349 175L378 153" fill="none" stroke={teal} strokeWidth="2.5" strokeLinejoin="round" />
    {[[233,208],[262,189],[291,194],[320,170],[349,175],[378,153]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="3.5" fill={teal} />)}
    <rect x="216" y="250" width="88" height="44" rx="6" fill="none" stroke={teal} />
    <rect x="313" y="250" width="93" height="44" rx="6" fill="none" stroke={teal} />
    {[teal, green, orange].map((colour,i) => <g key={colour} fill={colour}>
      <circle cx="226" cy={260+i*12} r="2.5" />
      <rect x="234" y={257.5+i*12} width={[56,43,29][i]} height="5" rx="2.5" />
      <rect x="323" y={257.5+i*12} width={[69,54,35][i]} height="5" rx="2.5" />
    </g>)}
  </g>;
}

/** Default artwork remains unchanged outside the case-study closing banner. */
export function ConversationArtwork({ className = "", variant = "default" }: { className?: string; variant?: "default" | "similar" }) {
  return <svg className={["data-artwork", className].join(" ")} viewBox="0 0 500 320" aria-hidden="true" focusable="false">
    {variant === "similar" ? <SimilarNeedScene /> : <>
    <path d="M22 196C34 94 134 52 231 73C290 9 409 17 451 91C508 199 453 284 352 301C198 328 31 294 22 196Z" fill={teal} />
    <path d="M23 119C30 44 76 3 145 3C203 0 233 34 239 94L184 159C110 143 61 175 23 218Z" fill={lime} />
    <path d="M35 226C93 154 162 153 221 196C304 255 395 163 457 178C485 251 432 291 325 306C192 321 77 285 35 226Z" fill={green} />
    <path d="M409 273C398 205 410 139 449 104C462 165 440 225 409 273Z" fill={lime} />
    <path d="M416 283C419 223 450 177 480 179C477 228 449 263 416 283Z" fill={green} />
    <path d="M416 293L443 135M418 277L465 198" fill="none" stroke={navy} strokeWidth="2" />
    <path d="M396 273H439L432 310H403Z" fill={white} />
    <g transform="translate(299 21)">
      <path d="M28 1V-8M3 15L-5 7M53 15L61 7M-5 36H-15M61 36H72" stroke={orange} strokeWidth="3" strokeLinecap="round" />
      <path d="M12 49C-9 29 3 5 27 5C52 5 64 29 43 49L39 61H16Z" fill={orange} />
      <path d="M22 59V34L15 27M32 59V34L39 27M22 34H32" fill="none" stroke={white} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 67H38M21 74H34" stroke={white} strokeWidth="3" strokeLinecap="round" />
    </g>
    <rect x="35" y="137" width="369" height="171" rx="14" fill={white} stroke={teal} strokeWidth="1.5" />
    {[50, 61, 72].map(x => <circle key={x} cx={x} cy="149" r="2" fill={teal} />)}
    <path d="M54 173H123M54 185H104M54 201H94" stroke={teal} strokeWidth="5" strokeLinecap="round" />
    <g transform="translate(101 251) scale(.76)"><Donut x={0} y={0} /></g>
    {[20, 40, 32, 58, 46, 65].map((height, i) => <rect key={i} x={183 + i * 30} y={234 - height} width="18" height={height} rx="2" fill={[teal, green, lime, teal, green, orange][i]} />)}
    <path d="M191 203L222 180L252 190L282 164L312 174L342 157" fill="none" stroke={navy} strokeWidth="2.5" strokeLinejoin="round" />
    {[[191,203],[222,180],[252,190],[282,164],[312,174],[342,157]].map(([x,y],i) => <circle key={x} cx={x} cy={y} r="4" fill={i === 2 ? orange : navy} stroke={white} strokeWidth="1" />)}
    <path d="M167 247H385M270 258V291" stroke={teal} strokeWidth="1" />
    {[64, 48, 56].map((width,i) => <g key={i} fill={[teal, green, orange][i]}><circle cx="176" cy={263 + i*12} r="3" /><rect x="187" y={260 + i*12} width={width} height="5" rx="2.5" /></g>)}
    {[89, 64, 48].map((width,i) => <rect key={i} x="282" y={259 + i*13} width={width} height="6" rx="3" fill={[teal, green, lime][i]} />)}
    <path d="M62 77L50 61M75 61L72 42" stroke={orange} strokeWidth="4" strokeLinecap="round" />
    </>}
    <IllustrationOwl x={variant === "similar" ? 156 : 91} y={variant === "similar" ? 26 : 10} width={variant === "similar" ? 112 : 126} height={variant === "similar" ? 120 : 135} />
  </svg>;
}

const pipelineLabels = {
  fr: ["Sources", "Intégration", "Transformation", "Data Quality", "Modèle", "Reporting"],
  en: ["Sources", "Integration", "Transformation", "Data Quality", "Model", "Reporting"],
} as const;
function PipelineDrawing({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 112 72" focusable="false">
      {stage === 0 ? <>
        <FileText x="11" y="8" size={29} color={teal} strokeWidth={1.6} />
        <Database x="65" y="7" size={31} color={teal} strokeWidth={1.6} />
        <Cloud x="37" y="41" size={30} color={green} strokeWidth={1.6} />
        <path d="M28 40V56H35M81 40V56H70" stroke={teal} fill="none" />
      </> : stage === 1 ? <>
        <path d="M21 46L56 27L91 46L56 65Z" fill={green} />
        <path d="M21 33L56 14L91 33L56 52Z" fill={lime} stroke={white} strokeWidth="3" />
        <path d="M21 20L56 1L91 20L56 39Z" fill={teal} stroke={white} strokeWidth="3" />
      </> : stage === 2 ? <>
        <Settings x="13" y="14" size={47} color={teal} strokeWidth={1.8} />
        <Settings x="64" y="5" size={28} color={lime} strokeWidth={2.4} />
        <Settings x="67" y="42" size={25} color={green} strokeWidth={2.4} />
      </> : stage === 3 ? <>
        <path d="M56 4L85 16V36C85 51 71 62 56 69C41 62 27 51 27 36V16Z" fill={green} />
        <path d="M42 35L52 45L71 25" stroke={white} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </> : stage === 4 ? <>
        <Database x="36" y="3" size={40} color={teal} strokeWidth={1.7} />
        <path d="M56 42V52M24 60V52H88V60" fill="none" stroke={teal} strokeWidth="2" />
        {[teal, orange, green].map((colour, i) => <rect key={colour} x={16 + i * 32} y="57" width="16" height="12" rx="3" fill={colour} />)}
      </> : <g transform="translate(2 4) scale(.27)"><DashboardDrawing /></g>}
    </svg>
  );
}

/** A compact, non-interactive overview; the service copy carries the meaning. */
export function ServicesArtwork({ locale }: { locale: Locale }) {
  return <div className="services-artwork" aria-hidden="true">
    {pipelineLabels[locale].map((label,i)=>{
      return <div className="pipeline-tile" key={label}>
        <span>{label}</span>
        <PipelineDrawing stage={i} />
      </div>;
    })}
  </div>;
}

export function AlignmentArtwork({ locale }: { locale: Locale }) {
  const labels=locale==="fr"?["Donnée","Technique","Métier"]:["Data","Technology","Business"];
  return <svg className="alignment-artwork" viewBox="0 0 480 96" aria-hidden="true" focusable="false">
    <path d="M70 40H410" stroke={lime} strokeWidth="2" />
    {[Database,Code2,UsersRound].map((Icon,i)=><g key={labels[i]}>
      <circle cx={70+i*170} cy="40" r="28" fill={white} stroke={teal} strokeWidth="2"/>
      <Icon x={57+i*170} y="27" size={26} color={teal} strokeWidth={1.6}/>
      <text x={70+i*170} y="87" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="inherit">{labels[i]}</text>
    </g>)}
  </svg>;
}
