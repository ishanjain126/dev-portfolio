// Case-study diagram bodies — the inner markup of each `.dia` (between the
// caption and the "in plain terms" note), copied verbatim from the original
// ishan-jain-profile.html. Keyed by `${companyId}.${accomplishmentId}`.
// Rendered with dangerouslySetInnerHTML; icons resolve against <IconDefs/>.

const D = {
  'bhanzu.streaming': `
    <svg class="svgdia" viewBox="0 0 600 150">
      <line class="link" x1="124" y1="72" x2="160" y2="72" marker-end="url(#ah)"/>
      <line class="link" x1="278" y1="72" x2="314" y2="72" marker-end="url(#ah)"/>
      <line class="link" x1="432" y1="72" x2="468" y2="72" marker-end="url(#ah)"/>
      <circle class="spark" r="3.4"><animateMotion dur="4s" repeatCount="indefinite" path="M14,72 H586"/></circle>
      <g><rect class="box glow" x="14" y="30" width="110" height="84" rx="11"/><use class="ico" href="#i-cam" x="58" y="44" width="22" height="22"/><text class="lbl" x="69" y="90">Teacher</text><text class="sub" x="69" y="105">camera · mic</text></g>
      <g><rect class="box glow d1 hot" x="168" y="30" width="110" height="84" rx="11"/><use class="ico hot" href="#i-cloud" x="212" y="44" width="22" height="22"/><text class="lbl" x="223" y="90">Amazon IVS</text><text class="sub" x="223" y="105">compress · ABR</text></g>
      <g><rect class="box glow d2" x="322" y="30" width="110" height="84" rx="11"/><use class="ico" href="#i-bolt" x="366" y="44" width="22" height="22"/><text class="lbl" x="377" y="90">Edge / CDN</text><text class="sub" x="377" y="105">deliver fast</text></g>
      <g><rect class="box glow d3 cool" x="476" y="30" width="110" height="84" rx="11"/><use class="ico cool" href="#i-users" x="520" y="44" width="22" height="22"/><text class="lbl" x="531" y="90">Students</text><text class="sub" x="531" y="105">50k+ · auto-quality</text></g>
    </svg>`,

  'bhanzu.whiteboard': `
    <svg class="svgdia" viewBox="0 0 600 230">
      <line class="link" x1="170" y1="64" x2="226" y2="64" marker-end="url(#ahHot)"/>
      <line class="link" x1="374" y1="64" x2="436" y2="64" marker-end="url(#ahHot)"/>
      <text class="sub" x="198" y="48">stroke event</text><text class="sub" x="406" y="48">broadcast</text>
      <line class="link" x1="300" y1="106" x2="300" y2="150" marker-end="url(#ahCool)"/>
      <text class="sub" x="360" y="130" style="text-anchor:start">log / replay</text>
      <circle class="spark" r="3.4"><animateMotion dur="3.4s" repeatCount="indefinite" path="M90,64 H300 V300 M300,64 H510"/></circle>
      <g><rect class="box" x="20" y="30" width="140" height="68" rx="12"/><use class="ico hot" href="#i-board" x="79" y="42" width="22" height="22"/><text class="lbl" x="90" y="78">Trainer</text><text class="sub" x="90" y="91">draws</text></g>
      <g><rect class="box hot" x="230" y="30" width="140" height="68" rx="12"/><use class="ico hot" href="#i-hub" x="289" y="42" width="22" height="22"/><text class="lbl" x="300" y="78">WebSocket hub</text><text class="sub" x="300" y="91">copies to all</text></g>
      <g><rect class="box" x="440" y="30" width="140" height="68" rx="12"/><use class="ico cool" href="#i-users" x="499" y="42" width="22" height="22"/><text class="lbl" x="510" y="78">Students</text><text class="sub" x="510" y="91">see it instantly</text></g>
      <g><rect class="box cool" x="232" y="152" width="136" height="56" rx="11"/><use class="ico cool" href="#i-db" x="289" y="160" width="22" height="22"/><text class="sub" x="300" y="194">event log · late-join replay</text></g>
    </svg>`,

  'bhanzu.backend': `
    <svg class="svgdia" viewBox="0 0 460 290">
      <line class="link" x1="230" y1="54" x2="230" y2="70" marker-end="url(#ahHot)"/>
      <line class="link" x1="230" y1="110" x2="230" y2="126" marker-end="url(#ahHot)"/>
      <line class="link" x1="230" y1="166" x2="230" y2="182" marker-end="url(#ahHot)"/>
      <line class="link" x1="230" y1="222" x2="230" y2="238" marker-end="url(#ahHot)"/>
      <circle class="spark" r="3.4"><animateMotion dur="3s" repeatCount="indefinite" path="M230,18 V250"/></circle>
      <g><rect class="box glow" x="80" y="14" width="300" height="40" rx="9"/><use class="ico" href="#i-shell" x="98" y="23" width="22" height="22"/><text class="lbl" x="240" y="34">Client / Frontend</text></g>
      <g><rect class="box glow d1" x="80" y="70" width="300" height="40" rx="9"/><use class="ico" href="#i-shield" x="98" y="79" width="22" height="22"/><text class="lbl" x="238" y="90">API · Route layer</text><text class="sub" x="360" y="90" style="text-anchor:end">auth · validation</text></g>
      <g><rect class="box glow d2" x="80" y="126" width="300" height="40" rx="9"/><use class="ico" href="#i-gear" x="98" y="135" width="22" height="22"/><text class="lbl" x="238" y="146">Service layer</text><text class="sub" x="360" y="146" style="text-anchor:end">business rules</text></g>
      <g><rect class="box glow d3" x="80" y="182" width="300" height="40" rx="9"/><use class="ico" href="#i-layers" x="98" y="191" width="22" height="22"/><text class="lbl" x="238" y="202">Repository layer</text><text class="sub" x="360" y="202" style="text-anchor:end">access patterns</text></g>
      <g><rect class="box glow d4 cool" x="80" y="238" width="300" height="44" rx="9"/><use class="ico cool" href="#i-db" x="98" y="249" width="22" height="22"/><text class="lbl" x="238" y="258">DynamoDB</text><text class="sub" x="360" y="258" style="text-anchor:end">single-table</text></g>
    </svg>`,

  'bhanzu.rag': `
    <svg class="svgdia" viewBox="0 0 600 200">
      <text class="grp" x="200" y="22">PREPARED OFFLINE</text>
      <line class="link" x1="262" y1="44" x2="288" y2="44" marker-end="url(#ahCool)"/>
      <line class="link" x1="330" y1="64" x2="330" y2="92" marker-end="url(#ahCool)"/>
      <g><rect class="box" x="190" y="30" width="72" height="30" rx="8"/><use class="ico cool" href="#i-doc" x="200" y="36" width="18" height="18"/><text class="sub" x="238" y="46">lessons</text></g>
      <g><rect class="box" x="290" y="30" width="80" height="30" rx="8"/><use class="ico cool" href="#i-cpu" x="300" y="36" width="18" height="18"/><text class="sub" x="343" y="46">indexed</text></g>
      <line class="link" x1="134" y1="137" x2="162" y2="137" marker-end="url(#ahHot)"/>
      <line class="link" x1="286" y1="137" x2="314" y2="137" marker-end="url(#ahHot)"/>
      <line class="link" x1="436" y1="137" x2="464" y2="137" marker-end="url(#ahHot)"/>
      <circle class="spark" r="3.4"><animateMotion dur="4s" repeatCount="indefinite" path="M14,137 H586"/></circle>
      <g><rect class="box glow" x="14" y="96" width="120" height="82" rx="11"/><use class="ico" href="#i-user" x="64" y="108" width="20" height="20"/><text class="lbl" x="74" y="152">Question</text><text class="sub" x="74" y="167">from student</text></g>
      <g><rect class="box glow d1 cool" x="166" y="96" width="120" height="82" rx="11"/><use class="ico cool" href="#i-db" x="216" y="108" width="20" height="20"/><text class="lbl" x="226" y="152">Find lessons</text><text class="sub" x="226" y="167">best matches</text></g>
      <g><rect class="box glow d2" x="318" y="96" width="120" height="82" rx="11"/><use class="ico" href="#i-doc" x="368" y="108" width="20" height="20"/><text class="lbl" x="378" y="152">Build prompt</text><text class="sub" x="378" y="167">lessons + question</text></g>
      <g><rect class="box glow d3 hot" x="468" y="96" width="120" height="82" rx="11"/><use class="ico hot" href="#i-ai" x="518" y="108" width="20" height="20"/><text class="lbl" x="528" y="152">AI answer</text><text class="sub" x="528" y="167">grounded</text></g>
    </svg>`,

  'bhanzu.microfrontend': `
    <svg class="svgdia" viewBox="0 0 600 320">
      <line class="link" x1="300" y1="72" x2="300" y2="86" marker-end="url(#ah)"/>
      <path class="flow" d="M300,112 V128 Q300,140 230,140 L120,140 V150" marker-end="url(#ahHot)"/>
      <path class="flow" d="M300,112 V150" marker-end="url(#ahHot)"/>
      <path class="flow" d="M300,112 V128 Q300,140 380,140 L488,140 V150" marker-end="url(#ahHot)"/>
      <circle class="spark" r="3"><animateMotion dur="3s" repeatCount="indefinite" path="M300,112 V150"/></circle>
      <path class="dash" d="M120,256 V232" marker-end="url(#ahCool)"/><path class="dash" d="M300,256 V232" marker-end="url(#ahCool)"/><path class="dash" d="M488,256 V232" marker-end="url(#ahCool)"/>
      <g><rect class="box hot" x="190" y="16" width="220" height="56" rx="12"/><use class="ico hot" href="#i-shell" x="234" y="24" width="22" height="22"/><text class="lbl" x="300" y="40">Host shell</text><text class="sub" x="300" y="58">routing · layout · auth</text></g>
      <g><rect class="box alt" x="150" y="86" width="300" height="26" rx="8"/><text class="sub" x="300" y="100">Module Federation — loads remotes at runtime</text></g>
      <g><rect class="box glow" x="30" y="150" width="180" height="80" rx="11"/><use class="ico" href="#i-puzzle" x="110" y="160" width="20" height="20"/><text class="lbl" x="120" y="198">Classroom</text><text class="sub" x="120" y="213">own repo · CI/CD</text></g>
      <g><rect class="box glow d1" x="210" y="150" width="180" height="80" rx="11"/><use class="ico" href="#i-puzzle" x="290" y="160" width="20" height="20"/><text class="lbl" x="300" y="198">Assignments</text><text class="sub" x="300" y="213">own repo · CI/CD</text></g>
      <g><rect class="box glow d2" x="390" y="150" width="180" height="80" rx="11"/><use class="ico" href="#i-puzzle" x="470" y="160" width="20" height="20"/><text class="lbl" x="480" y="198">Gamification</text><text class="sub" x="480" y="213">own repo · CI/CD</text></g>
      <g><rect class="box cool" x="70" y="256" width="460" height="52" rx="11"/><use class="ico cool" href="#i-layers" x="160" y="270" width="22" height="22"/><text class="lbl" x="300" y="276">Shared design system + packages</text><text class="sub" x="300" y="294">Storybook · React · TypeScript</text></g>
    </svg>`,

  'bhanzu.quality': `
    <svg class="svgdia" viewBox="0 0 600 190">
      <line class="link" x1="116" y1="96" x2="146" y2="96" marker-end="url(#ah)"/>
      <line class="link" x1="466" y1="96" x2="496" y2="96" marker-end="url(#ahHot)"/>
      <circle class="spark" r="3.4"><animateMotion dur="4s" repeatCount="indefinite" path="M16,96 H584"/></circle>
      <g><rect class="box glow" x="16" y="64" width="100" height="64" rx="11"/><use class="ico" href="#i-code" x="56" y="74" width="20" height="20"/><text class="lbl" x="66" y="106">Commit</text><text class="sub" x="66" y="120">a change</text></g>
      <rect x="148" y="38" width="318" height="116" rx="12" fill="none" stroke="var(--line-strong)" stroke-dasharray="4 5"/>
      <text class="grp" x="160" y="54">AUTOMATIC CHECKS</text>
      <g><rect class="box" x="160" y="68" width="92" height="74" rx="9"/><use class="ico" href="#i-beaker" x="196" y="78" width="20" height="20"/><text class="sub" x="206" y="112">Vitest</text><path class="tk" d="M196,124 l6,6 l10,-12" stroke="var(--data)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:.2s"/></g>
      <g><rect class="box" x="262" y="68" width="92" height="74" rx="9"/><use class="ico" href="#i-board" x="298" y="78" width="20" height="20"/><text class="sub" x="308" y="112">Playwright</text><path class="tk" d="M298,124 l6,6 l10,-12" stroke="var(--data)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:.9s"/></g>
      <g><rect class="box" x="364" y="68" width="92" height="74" rx="9"/><use class="ico" href="#i-shield" x="400" y="78" width="20" height="20"/><text class="sub" x="410" y="112">Type check</text><path class="tk" d="M400,124 l6,6 l10,-12" stroke="var(--data)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:1.6s"/></g>
      <g><rect class="box glow d4 hot" x="498" y="64" width="86" height="64" rx="11"/><use class="ico hot" href="#i-check" x="531" y="74" width="20" height="20"/><text class="lbl" x="541" y="106">Deploy</text><text class="sub" x="541" y="120">if all green</text></g>
    </svg>`,

  'avataar.tooling': `
    <div class="scene"><div class="cube"><div class="f1"></div><div class="f2"></div><div class="f3"></div><div class="f4"></div><div class="f5"></div><div class="f6"></div></div></div>
    <svg class="svgdia" viewBox="0 0 600 120">
      <line class="link" x1="124" y1="50" x2="146" y2="50" marker-end="url(#ah)"/>
      <line class="link" x1="270" y1="50" x2="292" y2="50" marker-end="url(#ah)"/>
      <line class="link" x1="416" y1="50" x2="438" y2="50" marker-end="url(#ah)"/>
      <circle class="spark cool" r="3.2"><animateMotion dur="3.6s" repeatCount="indefinite" path="M14,50 H586"/></circle>
      <g><rect class="box glow" x="14" y="18" width="110" height="64" rx="10"/><use class="ico" href="#i-code" x="58" y="28" width="20" height="20"/><text class="sub" x="69" y="62">React / JSX</text></g>
      <g><rect class="box glow d1" x="148" y="18" width="122" height="64" rx="10"/><use class="ico" href="#i-swap" x="199" y="28" width="20" height="20"/><text class="sub" x="209" y="58">R3F</text><text class="sub" x="209" y="70">reconciler</text></g>
      <g><rect class="box glow d2" x="294" y="18" width="122" height="64" rx="10"/><use class="ico" href="#i-cube" x="345" y="28" width="20" height="20"/><text class="sub" x="355" y="58">Three.js</text><text class="sub" x="355" y="70">scene graph</text></g>
      <g><rect class="box glow d3 cool" x="440" y="18" width="146" height="64" rx="10"/><use class="ico cool" href="#i-cpu" x="503" y="28" width="20" height="20"/><text class="sub" x="513" y="62">GPU → frame</text></g>
    </svg>`,

  'avataar.perf': `
    <div class="bars2">
      <div class="barrow"><span class="bl">before</span><div class="track"><div class="fill before"></div></div></div>
      <div class="barrow"><span class="bl">after</span><div class="track"><div class="fill after"></div></div></div>
    </div>`,

  'avataar.components': `
    <svg class="svgdia" viewBox="0 0 480 220">
      <line class="link" x1="120" y1="150" x2="210" y2="116" marker-end="url(#ahCool)"/>
      <line class="link" x1="240" y1="150" x2="240" y2="120" marker-end="url(#ahCool)"/>
      <line class="link" x1="360" y1="150" x2="270" y2="116" marker-end="url(#ahCool)"/>
      <line class="link" x1="240" y1="86" x2="240" y2="58" marker-end="url(#ahHot)"/>
      <circle class="spark cool" r="3"><animateMotion dur="2.6s" repeatCount="indefinite" path="M240,150 V58"/></circle>
      <g><rect class="box hot" x="180" y="18" width="120" height="40" rx="9"/><use class="ico hot" href="#i-cube" x="196" y="28" width="20" height="20"/><text class="lbl" x="248" y="38">3D Editor</text></g>
      <g><rect class="box cool" x="180" y="86" width="120" height="34" rx="9"/><text class="sub" x="240" y="103">Viewport</text></g>
      <g><rect class="box glow" x="20" y="150" width="120" height="40" rx="9"/><use class="ico" href="#i-gear" x="34" y="160" width="20" height="20"/><text class="sub" x="92" y="170">Controls</text></g>
      <g><rect class="box glow d1" x="180" y="150" width="120" height="40" rx="9"/><use class="ico" href="#i-layers" x="194" y="160" width="20" height="20"/><text class="sub" x="252" y="170">Material</text></g>
      <g><rect class="box glow d2" x="340" y="150" width="120" height="40" rx="9"/><use class="ico" href="#i-doc" x="354" y="160" width="20" height="20"/><text class="sub" x="412" y="170">Loader</text></g>
      <text class="grp" x="20" y="210">PRIMITIVES → COMPOSED → FEATURE</text>
    </svg>`,

  'stayflexi.bidflexi': `
    <svg class="svgdia" viewBox="0 0 600 160">
      <line class="link" x1="134" y1="70" x2="160" y2="70" marker-end="url(#ah)"/>
      <line class="link" x1="294" y1="70" x2="320" y2="70" marker-end="url(#ah)"/>
      <line class="link" x1="454" y1="70" x2="480" y2="70" marker-end="url(#ahHot)"/>
      <path class="flow" d="M387,98 V118 Q387,130 300,130 L220,130 V100" marker-end="url(#ah)"/>
      <text class="sub" x="260" y="148">counter offer</text>
      <circle class="spark" r="3.4"><animateMotion dur="3.4s" repeatCount="indefinite" path="M14,70 H586"/></circle>
      <g><rect class="box glow" x="14" y="40" width="120" height="58" rx="10"/><use class="ico" href="#i-tag" x="64" y="48" width="20" height="20"/><text class="lbl" x="74" y="78">Guest bid</text><text class="sub" x="74" y="91">offers ₹</text></g>
      <g><rect class="box glow d1" x="160" y="40" width="134" height="58" rx="10"/><use class="ico" href="#i-gear" x="220" y="48" width="20" height="20"/><text class="lbl" x="227" y="78">Pricing engine</text><text class="sub" x="227" y="91">rules · inventory</text></g>
      <g><rect class="box glow d2" x="320" y="40" width="134" height="58" rx="10"/><use class="ico" href="#i-swap" x="380" y="48" width="20" height="20"/><text class="lbl" x="387" y="78">Accept?</text><text class="sub" x="387" y="91">or counter</text></g>
      <g><rect class="box glow d3 hot" x="480" y="40" width="106" height="58" rx="10"/><use class="ico hot" href="#i-check" x="525" y="48" width="20" height="20"/><text class="lbl" x="533" y="78">Booking</text><text class="sub" x="533" y="91">confirmed</text></g>
    </svg>`,

  'stayflexi.pos': `
    <svg class="svgdia" viewBox="0 0 460 210">
      <line class="link" x1="230" y1="74" x2="230" y2="88" marker-end="url(#ah)"/>
      <path class="flow" d="M230,116 V132 Q230,144 160,144 L125,144 V158" marker-end="url(#ahHot)"/>
      <path class="flow" d="M230,116 V132 Q230,144 300,144 L335,144 V158" marker-end="url(#ahHot)"/>
      <circle class="spark" r="3"><animateMotion dur="3s" repeatCount="indefinite" path="M230,40 V144 H125 V158"/></circle>
      <g><rect class="box hot" x="120" y="20" width="220" height="54" rx="11"/><use class="ico hot" href="#i-code" x="176" y="30" width="20" height="20"/><text class="lbl" x="240" y="40">React Native</text><text class="sub" x="240" y="56">shared TypeScript code</text></g>
      <g><rect class="box alt" x="160" y="90" width="140" height="26" rx="8"/><text class="sub" x="230" y="104">JS → native bridge</text></g>
      <g><rect class="box glow" x="40" y="158" width="170" height="44" rx="10"/><use class="ico" href="#i-mobile" x="62" y="170" width="20" height="20"/><text class="lbl" x="135" y="180">iOS</text><text class="sub" x="135" y="194">native UI</text></g>
      <g><rect class="box glow d1" x="250" y="158" width="170" height="44" rx="10"/><use class="ico" href="#i-mobile" x="272" y="170" width="20" height="20"/><text class="lbl" x="345" y="180">Android</text><text class="sub" x="345" y="194">native UI</text></g>
    </svg>`,

  'stayflexi.scale': `
    <svg class="svgdia" viewBox="0 0 560 270">
      <line class="link" x1="132" y1="135" x2="186" y2="135" marker-end="url(#ahHot)"/>
      <line class="link" x1="350" y1="135" x2="386" y2="135" marker-end="url(#ah)"/>
      <path class="flow cool" d="M470,118 Q500,118 500,54 L500,48" marker-end="url(#ahCool)"/>
      <path class="flow cool" d="M470,135 H500" marker-end="url(#ahCool)"/>
      <path class="flow cool" d="M470,152 Q500,152 500,214 L500,222" marker-end="url(#ahCool)"/>
      <circle class="spark" r="3.4"><animateMotion dur="3.2s" repeatCount="indefinite" path="M20,135 H320"/></circle>
      <circle class="spark cool" r="3"><animateMotion dur="2.8s" repeatCount="indefinite" path="M386,135 H500 V48"/></circle>
      <g><rect class="box glow" x="20" y="103" width="112" height="64" rx="11"/><use class="ico" href="#i-hotel" x="66" y="113" width="20" height="20"/><text class="lbl" x="76" y="146">1,000+</text><text class="sub" x="76" y="160">hotels</text></g>
      <g><rect class="box hot" x="188" y="100" width="162" height="70" rx="12"/><use class="ico hot" href="#i-server" x="259" y="110" width="20" height="20"/><text class="lbl" x="269" y="144">PMS + OTA platform</text><text class="sub" x="269" y="158">high availability</text></g>
      <g><rect class="box cool" x="388" y="108" width="82" height="54" rx="10"/><use class="ico cool" href="#i-globe" x="419" y="116" width="18" height="18"/><text class="sub" x="429" y="150">Channels</text></g>
      <g><rect class="box" x="490" y="26" width="62" height="40" rx="8"/><text class="sub" x="521" y="46">Booking</text></g>
      <g><rect class="box" x="490" y="115" width="62" height="40" rx="8"/><text class="sub" x="521" y="135">Expedia</text></g>
      <g><rect class="box" x="490" y="204" width="62" height="40" rx="8"/><text class="sub" x="521" y="224">Airbnb +</text></g>
    </svg>`,

  'stayflexi.migration': `
    <svg class="svgdia" viewBox="0 0 560 160">
      <line class="link" x1="158" y1="44" x2="198" y2="44" marker-end="url(#ahHot)"/>
      <circle class="spark" r="3.4"><animateMotion dur="2.6s" repeatCount="indefinite" path="M158,44 H198"/></circle>
      <g><rect class="box" x="40" y="18" width="118" height="52" rx="10"/><use class="ico" href="#i-code" x="54" y="34" width="18" height="18"/><text class="lbl" x="105" y="40">Jython</text><text class="sub" x="99" y="56">legacy monolith</text></g>
      <g><rect class="box cool" x="200" y="18" width="118" height="52" rx="10"/><use class="ico cool" href="#i-server" x="214" y="34" width="18" height="18"/><text class="lbl" x="265" y="40">Django</text><text class="sub" x="259" y="56">modular apps</text></g>
      <text class="grp" x="40" y="100">FRONTEND CODE SPLITTING</text>
      <line class="link" x1="146" y1="124" x2="176" y2="108" marker-end="url(#ahCool)"/>
      <line class="link" x1="146" y1="128" x2="176" y2="144" marker-end="url(#ahCool)"/>
      <g><rect class="box" x="40" y="110" width="106" height="32" rx="8"/><text class="sub" x="93" y="127">one bundle</text></g>
      <g><rect class="box" x="178" y="94" width="100" height="26" rx="7"/><text class="sub" x="228" y="108">route chunk</text></g>
      <g><rect class="box" x="178" y="132" width="100" height="26" rx="7"/><text class="sub" x="228" y="146">lazy chunk</text></g>
      <g><rect class="box cool" x="300" y="96" width="110" height="58" rx="9"/><text class="lbl" x="355" y="118">~75%</text><text class="sub" x="355" y="134">faster load</text></g>
    </svg>`,
}

export default function diagramFor(companyId, accId) {
  return D[companyId + '.' + accId] || ''
}
