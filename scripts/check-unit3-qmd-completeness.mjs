#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const slidesDir = path.join(root, "IGCSE CS/slides/3-hardware");

const groups = {
  "3.1": [
    "3-1-1-the-central-processing-unit-cpu-p75.qmd",
    "3-1-2-von-neumann-architecture-p75-p80.qmd",
    "3-1-2-von-neumann-architecture-system-buses-memory-p77-p80.qmd",
    "3-1-2-von-neumann-architecture-fetch-decode-execute-cycle-p80.qmd",
    "3-1-3-cores-cache-and-internal-clock-p80-p83.qmd",
    "3-1-4-instruction-set-p83-p84.qmd",
    "3-1-5-embedded-systems-p84-p87.qmd",
    "3-1-5-embedded-systems-examples-p85-p87.qmd",
  ],
  "input-devices": [
    "3-2-1-input-devices-barcode-scanners-p88-p90.qmd",
    "3-2-1-input-devices-qr-codes-p90-p92.qmd",
    "3-2-1-input-devices-digital-cameras-p92-p93.qmd",
    "3-2-1-input-devices-keyboards-p93-p94.qmd",
    "3-2-1-input-devices-microphones-p94-p95.qmd",
    "3-2-1-input-devices-mouse-pointing-devices-p95-p96.qmd",
    "3-2-1-input-devices-scanners-2d-3d-p96-p98.qmd",
    "3-2-1-input-devices-touch-screens-p98-p101.qmd",
  ],
  "output-devices": [
    "3-2-2-output-devices-actuators-p101.qmd",
    "3-2-2-output-devices-light-projectors-p102-p103.qmd",
    "3-2-2-output-devices-inkjet-printers-p104-p105.qmd",
    "3-2-2-output-devices-laser-printers-p105.qmd",
    "3-2-2-output-devices-3d-printers-p106-p107.qmd",
    "3-2-2-output-devices-led-lcd-and-oled-screens-p108-p110.qmd",
    "3-2-2-output-devices-speakers-p110.qmd",
  ],
  "sensors-control": [
    "3-2-3-sensors-p111-p113.qmd",
    "3-2-3-sensors-monitoring-systems-p113-p114.qmd",
    "3-2-3-sensors-control-systems-p114-p118.qmd",
    "3-2-3-sensors-control-applications-p114-p118.qmd",
  ],
  "data-storage": [
    "3-3-data-storage-overview-p119-p120.qmd",
    "3-3-1-primary-memory-ram-dram-sram-p120-p122.qmd",
    "3-3-1-primary-memory-rom-p122-p123.qmd",
    "3-3-3-magnetic-storage-hdd-p123-p124.qmd",
    "3-3-3-solid-state-storage-ssd-p124-p126.qmd",
    "3-3-3-solid-state-storage-flash-memory-p126.qmd",
    "3-3-3-optical-storage-cd-dvd-p126-p128.qmd",
    "3-3-3-optical-storage-blu-ray-p128-p129.qmd",
    "3-3-4-virtual-memory-p129-p131.qmd",
    "3-3-5-cloud-storage-p130-p132.qmd",
  ],
  "network-hardware": [
    "3-4-1-network-interface-card-nic-p133.qmd",
    "3-4-2-mac-address-p133.qmd",
    "3-4-3-ip-address-p134-p136.qmd",
    "3-4-3-static-dynamic-ip-addresses-p135-p136.qmd",
    "3-4-4-routers-p136-p137.qmd",
  ],
};

groups["3.1.1-the-central-processing-unit-cpu"] = [
  "3-1-1-the-central-processing-unit-cpu-p75.qmd",
];
groups["3.1.2-von-neumann-architecture"] = [
  "3-1-2-von-neumann-architecture-p75-p80.qmd",
  "3-1-2-von-neumann-architecture-system-buses-memory-p77-p80.qmd",
  "3-1-2-von-neumann-architecture-fetch-decode-execute-cycle-p80.qmd",
];
groups["3.1.3-cores-cache-and-internal-clock"] = [
  "3-1-3-cores-cache-and-internal-clock-p80-p83.qmd",
];
groups["3.1.4-instruction-set"] = [
  "3-1-4-instruction-set-p83-p84.qmd",
];
groups["3.1.5-embedded-systems"] = [
  "3-1-5-embedded-systems-p84-p87.qmd",
  "3-1-5-embedded-systems-examples-p85-p87.qmd",
];
groups["3.2.1-input-devices"] = groups["input-devices"];
groups["3.2.2-output-devices"] = groups["output-devices"];
groups["3.2.3-sensors"] = groups["sensors-control"];

const expected = {
  "3-1-1-the-central-processing-unit-cpu-p75.qmd": {
    figures: [1],
    terms: [
      "central processing unit",
      "microprocessor",
      "integrated circuit",
      "execution",
      "Control Unit",
      "Arithmetic and Logic Unit",
      "registers",
      "buses",
    ],
  },
  "3-1-2-von-neumann-architecture-p75-p80.qmd": {
    figures: [1, 2],
    terms: [
      "stored program computer",
      "CPU can access memory directly",
      "programs and data",
      "sequential order",
      "Immediate Access Store",
      "Program Counter",
      "Memory Address Register",
      "Memory Data Register",
      "Current Instruction Register",
      "Accumulator",
    ],
  },
  "3-1-2-von-neumann-architecture-system-buses-memory-p77-p80.qmd": {
    figures: [2],
    terms: [
      "partitions",
      "address",
      "contents",
      "parallel transmission",
      "unidirectional",
      "bidirectional",
      "65 536",
      "4 294 967 296",
      "read signal",
      "write signal",
    ],
  },
  "3-1-2-von-neumann-architecture-fetch-decode-execute-cycle-p80.qmd": {
    figures: [3],
    terms: [
      "Program Counter",
      "MAR",
      "MDR",
      "CIR",
      "incremented",
      "decoded",
      "executed",
      "control bus",
    ],
  },
  "3-1-3-cores-cache-and-internal-clock-p80-p83.qmd": {
    figures: [4, 5],
    terms: [
      "system clock",
      "clock cycle",
      "3.5 GHz",
      "Overclocking",
      "overheating",
      "cache memory",
      "main memory/RAM",
      "dual core",
      "quad core",
    ],
  },
  "3-1-4-instruction-set-p83-p84.qmd": {
    figures: [],
    terms: [
      "opcode",
      "operand",
      "instruction set",
      "binary",
      "X86",
      "Intel Pentium",
      "AMD Athlon",
      "ADD",
      "JMP",
      "LDA",
    ],
  },
  "3-1-5-embedded-systems-p84-p87.qmd": {
    figures: [6],
    terms: [
      "specific set of functions",
      "microcontroller",
      "microprocessor",
      "system on chip",
      "feedback-orientated",
      "programmable",
      "non-programmable",
      "hackers",
      "viruses",
      "general-purpose computer",
    ],
  },
  "3-1-5-embedded-systems-examples-p85-p87.qmd": {
    figures: [7, 8, 9, 10, 11, 12],
    terms: [
      "GPS",
      "Airbags",
      "Fuel injection",
      "ABS braking",
      "set-top box",
      "Security",
      "Lighting",
      "Vending",
      "helix",
      "white goods",
      "Activity 3.2",
    ],
  },
  "3-2-1-input-devices-barcode-scanners-p88-p90.qmd": {
    figures: [13, 14, 15, 16],
    terms: [
      "guard bars",
      "photoelectric cells",
      "L D D D D L D",
      "0 1 1 1 1 0 1",
      "key field",
      "re-order level",
      "loyalty cards",
      "libraries",
    ],
  },
  "3-2-1-input-devices-qr-codes-p90-p92.qmd": {
    figures: [17, 18, 19],
    terms: [
      "4296",
      "7089",
      "30 digits",
      "alignment markers",
      "boarding pass",
      "error-checking",
      "attagging",
      "canvas area",
    ],
  },
  "3-2-1-input-devices-digital-cameras-p92-p93.qmd": {
    figures: [20, 21, 22],
    terms: [
      "shutter speed",
      "aperture",
      "red-eye",
      "photodiodes",
      "CCD",
      "2^8",
      "256",
      "24-bit RGB",
      "D7A528",
      "JPEG",
    ],
  },
  "3-2-1-input-devices-keyboards-p93-p94.qmd": {
    figures: [23, 24, 25],
    terms: [
      "USB",
      "wireless",
      "virtual",
      "ASCII",
      "slow",
      "errors",
      "RSI",
      "Ergonomic",
      "H key",
      "index file",
    ],
  },
  "3-2-1-input-devices-microphones-p94-p95.qmd": {
    figures: [26, 27],
    terms: [
      "diaphragm",
      "copper coil",
      "permanent magnet",
      "induced",
      "analogue",
      "sound card",
      "ADC",
      "hut",
    ],
  },
  "3-2-1-input-devices-mouse-pointing-devices-p95-p96.qmd": {
    figures: [28],
    terms: [
      "1500 images",
      "red LED",
      "CMOS",
      "DSP",
      "coordinates",
      "cursor",
      "mechanical",
      "Bluetooth",
      "batteries",
    ],
  },
  "3-2-1-input-devices-scanners-2d-3d-p96-p98.qmd": {
    figures: [29, 30, 31],
    terms: [
      "OCR",
      "JPEG",
      "passport",
      "ASCII",
      "distance between the eyes",
      "x, y and z",
      "CAD",
      "3D printer",
      "CT",
      "MRI",
      "SPECT",
    ],
  },
  "3-2-1-input-devices-touch-screens-p98-p101.qmd": {
    figures: [32, 33, 34, 35],
    terms: [
      "capacitive",
      "surface capacitive",
      "Projective capacitive",
      "multi-touch",
      "infrared",
      "water or moisture",
      "resistive",
      "polyethylene",
      "argon",
      "strong sunlight",
    ],
  },
  "3-2-2-output-devices-actuators-p101.qmd": {
    figures: [36],
    terms: [
      "mechanical or electromechanical device",
      "relay",
      "solenoid",
      "motor",
      "conveyer belt",
      "valve",
      "electromagnetic field",
      "linear motion",
      "plunger",
      "rotary solenoids",
    ],
  },
  "3-2-2-output-devices-light-projectors-p102-p103.qmd": {
    figures: [37, 38],
    terms: [
      "digital light projector",
      "liquid crystal display",
      "micro mirrors",
      "DMD chip",
      "1024 grey shades",
      "over 16 million",
      "dichromic mirrors",
      "prism",
      "colour saturation",
      "contrast ratios",
    ],
  },
  "3-2-2-output-devices-inkjet-printers-p104-p105.qmd": {
    figures: [39],
    terms: [
      "print head",
      "nozzles",
      "ink cartridges",
      "stepper motor",
      "thermal bubble",
      "piezoelectric",
      "printer driver",
      "printer buffer",
      "paper feed",
      "interrupt",
    ],
  },
  "3-2-2-output-devices-laser-printers-p105.qmd": {
    figures: [40],
    terms: [
      "toner",
      "static electricity",
      "whole page",
      "printer driver",
      "printer buffer",
      "positive charge",
      "drum",
      "negatively charged",
      "fuser",
      "discharge lamp",
    ],
  },
  "3-2-2-output-devices-3d-printers-p106-p107.qmd": {
    figures: [41, 42, 43],
    terms: [
      "solid objects",
      "powdered resin",
      "powdered metal",
      "additive manufacturing",
      "subtractive manufacturing",
      "0.1 mm",
      "direct 3D printing",
      "binder 3D printing",
      "CAD",
      "prosthetic",
      "aerospace",
    ],
  },
  "3-2-2-output-devices-led-lcd-and-oled-screens-p108-p110.qmd": {
    figures: [44, 45],
    terms: [
      "light emitting diodes",
      "liquid crystals",
      "backlighting",
      "CCFL",
      "blue-white LEDs",
      "organic materials",
      "metallic cathode",
      "glass anode",
      "no separate backlight",
      "170 degrees",
    ],
  },
  "3-2-2-output-devices-speakers-p110.qmd": {
    figures: [46, 47],
    terms: [
      "Loudspeakers",
      "digital data",
      "DAC",
      "electric current",
      "amplifier",
      "coil of wire",
      "iron core",
      "permanent magnet",
      "temporary electromagnet",
      "sound waves",
    ],
  },
  "3-2-3-sensors-p111-p113.qmd": {
    figures: [48, 49],
    terms: [
      "physical properties",
      "analogue",
      "constantly changing",
      "mercury column",
      "discrete digital values",
      "ADC",
      "DAC",
      "feedback",
      "constant values",
      "Temperature sensors",
      "Moisture sensors",
      "Humidity sensors",
      "Active infrared",
      "passive infrared",
      "Pressure sensors",
      "Acoustic",
      "Gas sensors",
      "pH sensors",
      "Magnetic field sensors",
      "accelerometers",
      "Proximity sensors",
      "Flow-rate sensors",
      "level sensors",
    ],
  },
  "3-2-3-sensors-monitoring-systems-p113-p114.qmd": {
    figures: [50, 51],
    terms: [
      "no effect on what is being monitored",
      "outside the acceptable range",
      "warning message",
      "patient monitoring",
      "burglar alarm",
      "pollution levels",
      "acoustic sensor",
      "infrared sensor",
      "pressure sensor",
      "password",
      "every 5 seconds",
      "siren",
      "flashing lights",
      "vital signs",
      "heart rate",
      "breathing rate",
      "digital readout",
      "sensors are disconnected",
    ],
  },
  "3-2-3-sensors-control-systems-p114-p118.qmd": {
    figures: [50],
    terms: [
      "control devices",
      "stored values",
      "outside the acceptable range",
      "feedback loop",
      "ADC",
      "DAC",
      "actuator",
      "street lights",
      "central heating",
      "air conditioning",
      "chemical process",
      "anti-lock brakes",
      "greenhouse",
    ],
  },
  "3-2-3-sensors-control-applications-p114-p118.qmd": {
    figures: [52, 53, 54, 55, 56],
    terms: [
      "light sensor",
      "sunny",
      "cloudy",
      "raining",
      "night time",
      "every minute",
      "30 minutes",
      "magnetic field sensors",
      "braking pressure",
      "gas supply",
      "pre-set value",
      "water pump",
      "70°C",
      "3.5",
      "computer system is activated",
      "humidity",
      "moisture",
      "temperature",
      "pH",
      "light",
      "alkali",
      "positive feedback",
      "300°C",
      "10 bar",
      "gas or liquid pump",
      "road sensors",
      "colour sequence",
      "Activity 3.5",
    ],
  },
  "3-3-data-storage-overview-p119-p120.qmd": {
    figures: [57, 58],
    terms: [
      "memory",
      "storage",
      "primary memory",
      "secondary storage",
      "directly",
      "permanently",
      "data loss",
      "data drop",
    ],
  },
  "3-3-1-primary-memory-ram-dram-sram-p120-p122.qmd": {
    figures: [59, 60, 61],
    requireImages: false,
    terms: [
      "RAM",
      "volatile memory",
      "read/write capability",
      "any memory location in RAM can be accessed independent",
      "DRAM",
      "must be constantly refreshed",
      "SRAM",
      "flip-flops",
      "memory cache",
      "secondary storage",
    ],
  },
  "3-3-1-primary-memory-rom-p122-p123.qmd": {
    figures: [],
    terms: [
      "ROM",
      "non-volatile memory",
      "permanent memory",
      "read-only",
      "BIOS",
      "self-test procedures",
      "start-up routines",
      "microwave oven",
      "remote-controlled model aeroplane",
    ],
  },
  "3-3-3-magnetic-storage-hdd-p123-p124.qmd": {
    figures: [62, 63],
    terms: [
      "magnetic storage",
      "hard disk drives (HDD)",
      "platters",
      "read-write heads",
      "tracks",
      "sectors",
      "fixed number of bytes",
      "latency",
      "fragmented",
      "sequentially",
      "USB",
    ],
  },
  "3-3-3-solid-state-storage-ssd-p124-p126.qmd": {
    figures: [64],
    terms: [
      "solid state drive (SSD)",
      "no moving parts",
      "NAND",
      "NOR",
      "CMOS",
      "floating gate",
      "control gate",
      "dielectric coating",
      "non-volatile",
      "trapped in the floating gate",
    ],
  },
  "3-3-3-solid-state-storage-flash-memory-p126.qmd": {
    figures: [],
    terms: [
      "memory sticks",
      "flash memories",
      "pen drives",
      "solid-state technology",
      "USB port",
      "non-volatile",
      "file transfer between computers",
      "portable backup",
      "software dongle",
    ],
  },
  "3-3-3-optical-storage-cd-dvd-p126-p128.qmd": {
    figures: [65, 66],
    terms: [
      "optical storage devices",
      "laser light",
      "pits",
      "lands",
      "single spiral track",
      "red laser",
      "write once only",
      "many times",
      "dual-layering",
      "polycarbonate",
      "650 nanometres",
      "780 nanometres",
    ],
  },
  "3-3-3-optical-storage-blu-ray-p128-p129.qmd": {
    figures: [67],
    terms: [
      "blu-ray",
      "blue laser",
      "405 nanometres",
      "27 GB",
      "50 GB",
      "36 Mbps",
      "secure encryption system",
      "greater interactivity",
      "movies or games",
    ],
  },
  "3-3-4-virtual-memory-p129-p131.qmd": {
    figures: [68, 69, 70],
    terms: [
      "virtual memory",
      "swap space on the hard disk or SSD",
      "map",
      "paging",
      "fixed-length consecutive",
      "illusion of unlimited memory",
      "disk thrashing",
      "thrash point",
      "system crash",
    ],
  },
  "3-3-5-cloud-storage-p130-p132.qmd": {
    figures: [],
    terms: [
      "cloud storage",
      "remote servers",
      "public cloud",
      "private cloud",
      "hybrid cloud",
      "data redundancy",
      "relinquishing control",
      "pharming",
      "XEN",
      "93 million voter registrations",
    ],
  },
  "3-4-1-network-interface-card-nic-p133.qmd": {
    figures: [],
    terms: [
      "network interface card (NIC)",
      "MAC address",
      "Wireless network interface cards/controllers (WNICs)",
      "wireless connectivity",
      "antenna",
      "microwaves",
      "USB port",
      "If the NIC card is replaced",
    ],
  },
  "3-4-2-mac-address-p133.qmd": {
    figures: [],
    terms: [
      "MAC address",
      "48 bits",
      "manufacturer's code",
      "device serial number",
      "set by the manufacturer at the factory",
      "change their MAC address",
      "bypass a MAC address filter",
      "network restrictions",
    ],
  },
  "3-4-3-ip-address-p134-p136.qmd": {
    figures: [],
    terms: [
      "IP address",
      "unique logical address",
      "protocols",
      "router assigns a private IP address",
      "unique public IP address",
      "internet service provider (ISP)",
      "IPv4",
      "32 bits",
      "IPv6",
      "128-bit addresses",
      "built-in authentication checks",
    ],
  },
  "3-4-3-static-dynamic-ip-addresses-p135-p136.qmd": {
    figures: [71],
    terms: [
      "static (don't change)",
      "dynamic (change every time a device connects to the internet)",
      "internet service provider (ISP)",
      "remote servers which are hosting a website",
      "File Transfer Protocol (FTP) server",
      "Dynamic Host Configuration Protocol (DHCP)",
      "DHCP server",
      "greater privacy",
      "DNS server",
      "website server",
      "VoIP",
    ],
  },
  "3-4-4-routers-p136-p137.qmd": {
    figures: [72],
    terms: [
      "Routers",
      "data packets to be routed between different networks",
      "protocol and format understood by another network",
      "wired or wireless devices",
      "switch",
      "MAC destination address",
      "Broadband routers",
      "firewall",
      "private networks to be connected",
    ],
  },
};

const oldStylePattern =
  /professional term，专业术语|feature-grid|node-grid|summary-grid|line-list|compare-table|unit3-.*\.svg|white\.min\.css/;

function usage() {
  console.error(
    [
      "Usage:",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=3.1",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=3.1.2-von-neumann-architecture",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=input-devices",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=3.2.1-input-devices",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=output-devices",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=3.2.2-output-devices",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=sensors-control",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=3.2.3-sensors",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=data-storage",
      "  node scripts/check-unit3-qmd-completeness.mjs --section=network-hardware",
      "  node scripts/check-unit3-qmd-completeness.mjs --file=3-2-1-input-devices-barcode-scanners-p88-p90.qmd",
      "  node scripts/check-unit3-qmd-completeness.mjs --all",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const out = { files: [] };
  for (const arg of argv) {
    if (arg === "--all") out.all = true;
    else if (arg.startsWith("--section=")) out.section = arg.slice("--section=".length);
    else if (arg.startsWith("--file=")) out.files.push(arg.slice("--file=".length));
    else if (arg === "-h" || arg === "--help") out.help = true;
    else out.unknown = arg;
  }
  return out;
}

function relPathFromQmd(qmdPath, rel) {
  return path.resolve(path.dirname(qmdPath), rel);
}

function uniqueNumbers(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

function selectFiles(args) {
  if (args.all) return Object.keys(expected).sort();
  if (args.section) {
    if (!groups[args.section]) {
      throw new Error(`Unknown section: ${args.section}`);
    }
    return groups[args.section];
  }
  if (args.files.length > 0) return args.files.map((file) => path.basename(file));
  return [
    ...groups["3.1"],
    ...groups["input-devices"],
    ...groups["output-devices"],
    ...groups["sensors-control"],
    ...groups["data-storage"],
    ...groups["network-hardware"],
  ];
}

function checkFile(file) {
  const errors = [];
  const warnings = [];
  const qmdPath = path.join(slidesDir, file);
  const rule = expected[file];

  if (!rule) {
    errors.push(`No completeness rule registered for ${file}`);
    return { file, errors, warnings };
  }

  if (!fs.existsSync(qmdPath)) {
    errors.push(`QMD file not found: ${qmdPath}`);
    return { file, errors, warnings };
  }

  const text = fs.readFileSync(qmdPath, "utf8");
  const lowerText = text.toLowerCase();
  const images = [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
  const figures = uniqueNumbers([...text.matchAll(/Figure\s+3\.(\d+)/g)].map((m) => Number(m[1])));
  const slideCount = (text.match(/^##\s+/gm) || []).length;
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (!/format:\s*\n\s+clean-revealjs:|format:\s*clean-revealjs/.test(text)) {
    errors.push("Missing clean-revealjs format");
  }
  if (/^date\s*:/m.test(text)) {
    errors.push("Contains YAML date field");
  }
  if (oldStylePattern.test(text)) {
    errors.push("Contains old style class, old SVG path, or placeholder Chinese term");
  }

  for (const image of images) {
    if (!fs.existsSync(relPathFromQmd(qmdPath, image))) {
      errors.push(`Missing image: ${image}`);
    }
  }

  const missingFigures = rule.figures.filter((figure) => !figures.includes(figure));
  if (missingFigures.length > 0) {
    errors.push(`Missing Figure references: ${missingFigures.map((n) => `3.${n}`).join(", ")}`);
  }

  const missingTerms = rule.terms.filter((term) => !lowerText.includes(term.toLowerCase()));
  if (missingTerms.length > 0) {
    errors.push(`Missing required textbook terms/details: ${missingTerms.join(", ")}`);
  }

  if (slideCount < 5) {
    warnings.push(`Low slide count: ${slideCount}`);
  }
  if (wordCount < 220) {
    warnings.push(`Low word count: ${wordCount}`);
  }
  if ((rule.requireImages ?? rule.figures.length > 0) && images.length === 0) {
    errors.push("Expected textbook figures but found no image references");
  }

  return {
    file,
    slideCount,
    wordCount,
    imageCount: images.length,
    figures,
    errors,
    warnings,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.unknown) {
    if (args.unknown) console.error(`Unknown argument: ${args.unknown}`);
    usage();
    process.exit(args.unknown ? 2 : 0);
  }

  let files;
  try {
    files = selectFiles(args);
  } catch (error) {
    console.error(`FAIL: ${error.message}`);
    usage();
    process.exit(2);
  }

  const reports = files.map(checkFile);
  let errorCount = 0;
  let warningCount = 0;

  for (const report of reports) {
    const stats =
      report.slideCount === undefined
        ? ""
        : ` (${report.slideCount} slides, ${report.wordCount} words, ${report.imageCount} images, figures: ${report.figures.map((n) => `3.${n}`).join(", ") || "none"})`;
    if (report.errors.length === 0) {
      console.log(`OK: ${report.file}${stats}`);
    } else {
      console.log(`FAIL: ${report.file}${stats}`);
      for (const error of report.errors) console.log(`  - ${error}`);
      errorCount += report.errors.length;
    }
    for (const warning of report.warnings) {
      console.log(`WARN: ${report.file}: ${warning}`);
      warningCount += 1;
    }
  }

  console.log(
    `\nChecked ${reports.length} qmd file(s): ${errorCount} error(s), ${warningCount} warning(s).`,
  );
  if (errorCount > 0) process.exit(1);
}

main();
