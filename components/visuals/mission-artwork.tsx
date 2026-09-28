import { Bell, Check, Database, FileText, Globe, Settings, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { ProjectVisualVariant } from "@/types/content";

const navy = "var(--brand-primary)";
const teal = "var(--brand-secondary)";
const green = "var(--brand-quality)";
const lime = "var(--brand-tertiary)";
const orange = "var(--brand-action)";
const white = "var(--surface)";

function Panel({ x, y, width, height, window = false, children }: {
  x: number; y: number; width: number; height: number; window?: boolean; children: ReactNode;
}) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height={height} rx="17" fill={white} stroke={teal} strokeWidth="2.5" />
    {window ? <>
      <path d={`M1 35H${width - 1}`} stroke={teal} strokeWidth="1.5" />
      {[orange, lime, green].map((color, index) => <circle key={color} cx={20 + index * 15} cy="18" r="4.5" fill={color} />)}
    </> : null}
    {children}
  </g>;
}

function Lines({ x, y, width = 60 }: { x: number; y: number; width?: number }) {
  return <path d={`M${x} ${y}h${width}M${x} ${y + 17}h${width * .68}M${x} ${y + 34}h${width * .85}`} fill="none" stroke={teal} strokeWidth="5" strokeLinecap="round" />;
}

function Arrow({ d, x, y, color = white }: { d: string; x: number; y: number; color?: string }) {
  return <g fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} /><path d={`M${x - 9} ${y - 8}L${x} ${y}L${x - 9} ${y + 8}`} />
  </g>;
}

function Table({ x, y, width = 103 }: { x: number; y: number; width?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height="65" rx="3" fill="none" stroke={teal} strokeWidth="2" />
    <path d={`M0 0H${width}V15H0Z`} fill={teal} />
    <path d={`M0 32H${width}M0 49H${width}M${width * .33} 15V65M${width * .68} 15V65`} stroke={teal} strokeWidth="2" />
    <path d="M6 23H19M6 40H15M6 57H18" stroke={green} strokeWidth="3" />
  </g>;
}

function Source({ y, kind }: { y: number; kind: "web" | "database" | "document" | "table" }) {
  return <Panel x={38} y={y} width={163} height={82}>
    {kind === "web" ? <Globe x="18" y="21" size={40} color={teal} strokeWidth={1.8} />
      : kind === "database" ? <Database x="18" y="20" size={41} color={teal} strokeWidth={1.8} />
      : kind === "document" ? <FileText x="19" y="20" size={39} color={teal} strokeWidth={1.8} />
      : <g transform="translate(17 20) scale(.62)"><Table x={0} y={0} width={68} /></g>}
    <Lines x={78} y={25} width={60} />
  </Panel>;
}

function SourceLinks() {
  return <>
    <Arrow d="M201 89C241 89 227 183 270 183" x={270} y={183} />
    <Arrow d="M201 199H270" x={270} y={199} color={orange} />
    <Arrow d="M201 309C241 309 227 215 270 215" x={270} y={215} />
  </>;
}

function Processing({ x = 281, y = 119 }: { x?: number; y?: number }) {
  return <Panel x={x} y={y} width={174} height={165} window>
    <Lines x={24} y={57} width={77} />
    <rect x="24" y="125" width="60" height="13" rx="6" fill={lime} />
    <Settings x="108" y="107" size={43} color={teal} strokeWidth={2.4} />
  </Panel>;
}

function Bars({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {[34, 62, 49, 91, 113].map((height, index) => <rect key={index} x={index * 29} y={118 - height} width="19" height={height} rx="2.5" fill={[teal, green, lime, orange, teal][index]} />)}
    <path d="M-5 126H145" stroke={teal} strokeWidth="1.5" />
  </g>;
}

function Donut({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y}) rotate(-90)`} fill="none" strokeWidth="13">
    <circle r="25" stroke={teal} />
    <circle r="25" stroke={green} strokeDasharray="57 158" />
    <circle r="25" stroke={orange} strokeDasharray="32 158" strokeDashoffset="-57" />
  </g>;
}

function AreaChart({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0 62C18 18 33 25 48 44S74 45 87 19S115 4 126 23V78H0Z" fill={green} />
    <path d="M0 69C22 45 33 44 49 56S75 64 89 39S110 42 126 35V78H0Z" fill={teal} />
    <path d="M0 78H126" stroke={navy} strokeWidth="2" />
  </g>;
}

function PipelineScene() {
  return <>
    <SourceLinks />
    <Arrow d="M455 201H510" x={510} y={201} />
    <Source y={48} kind="table" /><Source y={158} kind="database" /><Source y={268} kind="document" />
    <Processing />
    <Panel x={522} y={111} width={160} height={183}>
      <g transform="translate(37 24)" stroke={teal} strokeWidth="3" fill={teal}>
        <path d="M0 15V91C0 111 86 111 86 91V15Z" />
        <ellipse cx="43" cy="15" rx="43" ry="15" stroke={white} />
        <path d="M0 40 C0 60 86 60 86 40M0 66C0 86 86 86 86 66" stroke={white} fill="none" />
      </g>
      <path d="M30 151H70 M90 151H130" stroke={green} strokeWidth="6" strokeLinecap="round" />
    </Panel>
  </>;
}

function CollectionScene() {
  return <>
    <SourceLinks /><Arrow d="M455 200H509" x={509} y={200} />
    <Source y={48} kind="web" /><Source y={158} kind="database" /><Source y={268} kind="document" />
    <Panel x={281} y={111} width={174} height={183} window>
      <Lines x={24} y={58} width={64} />
      <path d="M31 146H69C97 146 91 79 126 79M69 146C97 146 100 153 137 153" fill="none" stroke={teal} strokeWidth="3" />
      <circle cx="31" cy="146" r="8" fill={green} /><circle cx="126" cy="79" r="8" fill={orange} /><circle cx="137" cy="153" r="8" fill={lime} />
    </Panel>
    <g transform="translate(524 96)">
      <path d="M16 0H113L154 41V208Q154 223 139 223H16Q0 223 0 207V16Q0 0 16 0Z" fill={white} stroke={teal} strokeWidth="2.5" />
      <path d="M113 1V41H153" fill="none" stroke={teal} strokeWidth="2.5" />
      <Table x={24} y={69} width={106} />
      <Lines x={24} y={161} width={103} />
    </g>
  </>;
}

function QualityScene() {
  return <>
    <Arrow d="M201 126C243 126 230 183 270 183" x={270} y={183} />
    <Arrow d="M201 277C243 277 230 219 270 219" x={270} y={219} color={orange} />
    <Arrow d="M455 201H510" x={510} y={201} />
    <Panel x={38} y={64} width={163} height={124}><AreaChart x={18} y={25} /></Panel>
    <Panel x={38} y={218} width={163} height={116}><Table x={20} y={25} width={123} /></Panel>
    <Panel x={281} y={103} width={174} height={198} window>
      {[75, 121, 167].map(y => <g key={y}>
        <Check x="20" y={y - 14} size={28} color={green} strokeWidth={3} />
        <path d={`M64 ${y}H145`} stroke={teal} strokeWidth="6" strokeLinecap="round" />
      </g>)}
    </Panel>
    <Panel x={522} y={117} width={160} height={176}>
      <Bars x={21} y={60} scale={.82} />
      <rect x="84" y="12" width="62" height="60" rx="12" fill={white} />
      <ShieldCheck x="91" y="17" size={49} color={green} strokeWidth={2.2} />
    </Panel>
  </>;
}

function ReportingScene() {
  return <>
    <Arrow d="M188 123C222 123 215 186 245 186" x={245} y={186} />
    <Arrow d="M188 287C222 287 215 219 245 219" x={245} y={219} />
    <Arrow d="M351 202H389" x={389} y={202} />
    <Panel x={30} y={64} width={158} height={118}><Table x={20} y={26} width={118} /></Panel>
    <Panel x={30} y={227} width={158} height={109}>
      <path d="M21 80 L53 40 L84 52L132 24" stroke={teal} strokeWidth="3" fill="none" />
      {[[21,80],[53,40],[84,52],[132,24]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="6" fill={teal} />)}
    </Panel>
    <Panel x={255} y={146} width={96} height={114} window><Settings x="22" y="50" size={52} color={teal} strokeWidth={2.2} /></Panel>
    <Panel x={402} y={50} width={285} height={300} window>
      <Bars x={39} y={63} scale={1.2} />
      <path d="M50 153L85 119L120 134L155 85L190 60" stroke={orange} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
      {[[50,153],[85,119],[120,134],[155,85],[190,60]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="5" fill={orange} />)}
      <Donut x={60} y={256} />
      <path d="M120 239H247M120 257H218M120 275H234" stroke={teal} strokeWidth="5" strokeLinecap="round" />
      {[green, lime, orange].map((color,index) => <circle key={color} cx="105" cy={239 + index * 18} r="4" fill={color} />)}
    </Panel>
  </>;
}

function ModelScene() {
  return <>
    <Arrow d="M199 200H252" x={252} y={200} /><Arrow d="M463 200H515" x={515} y={200} />
    <Panel x={38} y={130} width={161} height={144}><Table x={20} y={23} width={121} /><path d="M22 113H80 M98 113H136" stroke={teal} strokeWidth="5" strokeLinecap="round" /></Panel>
    <Panel x={265} y={92} width={198} height={218} window>
      <g data-model-network="centered">
        <path d="M32 65L99 96L166 127M32 127L99 96M32 127L99 158L166 127M32 189L99 158" stroke={teal} strokeWidth="2.5" fill="none" />
        {[
          { x: 32, rows: [65, 127, 189], color: teal },
          { x: 99, rows: [96, 158], color: green },
          { x: 166, rows: [127], color: orange },
        ].map(({ x, rows, color }) => <g key={x} data-model-column={x} fill={color}>
          {rows.map(y => <circle key={y} cx={x} cy={y} r="10" />)}
        </g>)}
      </g>
    </Panel>
    <Panel x={529} y={116} width={153} height={178} window>
      <path d="M30 116A47 47 0 0 1 94 72" fill="none" stroke={teal} strokeWidth="11" />
      <path d="M94 72A47 47 0 0 1 124 116" fill="none" stroke={lime} strokeWidth="11" />
      <path d="M77 117L103 89" stroke={navy} strokeWidth="4" strokeLinecap="round" />
      <circle cx="77" cy="117" r="7" fill={orange} />
      <path d="M31 151H120" stroke={teal} strokeWidth="5" strokeLinecap="round" />
    </Panel>
  </>;
}

function AutomationScene() {
  return <>
    <SourceLinks />
    <Arrow d="M455 181C487 181 479 116 514 116" x={514} y={116} />
    <Arrow d="M455 220C487 220 479 289 514 289" x={514} y={289} />
    <Source y={48} kind="database" /><Source y={158} kind="web" /><Source y={268} kind="table" />
    <Processing />
    <g transform="translate(529 41)">
      <path d="M14 0H111L151 40 V150Q151 164 137 164H14Q0 164 0 150V14Q0 0 14 0Z" fill={white} stroke={teal} strokeWidth="2.5" />
      <path d="M111 1V40H150" fill="none" stroke={teal} strokeWidth="2.5" />
      <Bars x={23} y={49} scale={.74} />
    </g>
    <Panel x={529} y={232} width={151} height={118}>
      <Bell x="50" y="15" size={51} color={orange} strokeWidth={2.3} fill={orange} />
      <path d="M30 80 H121M30 97H94" stroke={teal} strokeWidth="5" strokeLinecap="round" />
    </Panel>
  </>;
}

const scenes: Record<ProjectVisualVariant, () => ReactNode> = {
  "data-pipeline": PipelineScene,
  "document-automation": CollectionScene,
  "data-quality": QualityScene,
  "bi-reporting": ReportingScene,
  "ml-model": ModelScene,
  "python-api": AutomationScene,
};

/** One text-free schematic per mission, shared by cards and case-study pages. */
export function MissionArtwork({ variant }: { variant: ProjectVisualVariant }) {
  const Scene = scenes[variant];
  return <svg className="mission-artwork" data-mission={variant} viewBox="0 0 720 400" aria-hidden="true" focusable="false">
    <Scene />
  </svg>;
}
