import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';

/**
 * Record of Environment to Group ID to Name.
 */
export const environmentGroupMap: {
   [env in EnvironmentAllName]?: { [key: number]: string };
} = {
   WeaveEnvironment: {
      0: 'Outer Square Bottom Left Laser',
      1: 'Outer Square Bottom Right Laser',
      2: 'Outer Square Top Left Laser',
      3: 'Outer Square Top Right Laser',
      4: 'Inner Square Bottom Left Laser',
      5: 'Inner Square Bottom Right Laser',
      6: 'Inner Square Top Left Laser',
      7: 'Inner Square Top Right Laser',
      8: 'Side Square Bottom Left Laser',
      9: 'Side Square Bottom Right Laser',
      10: 'Side Square Top Left Laser',
      11: 'Side Square Top Right Laser',
      12: 'Distant Square Top Laser',
      13: 'Distant Square Bottom Laser',
      14: 'Distant Square Left Laser',
      15: 'Distant Square Right Laser',
   },
   PyroEnvironment: {
      0: 'Stage Left Platform',
      1: 'Stage Right Platform',
      2: 'Top Stage Left Laser',
      3: 'Top Stage Right Laser',
      4: 'Top Stage Middle Laser',
      5: 'Top Stage Light',
      6: 'Side Panels Left Tower',
      7: 'Side Panels Right Tower',
      8: 'Stage Left Laser',
      9: 'Stage Right Laser',
      10: 'Side Panels Left Laser',
      11: 'Side Panels Right Laser',
      12: 'Fire Left',
      13: 'Fire Right',
   },
   EDMEnvironment: {
      0: 'Circles Top',
      1: 'Circles Close',
      2: 'Circles Distant',
      3: 'Circles Distant 2',
      4: 'Single Source Circles Left',
      5: 'Single Source Circles Right',
      6: 'Single Source Lasers Left (Up)',
      7: 'Single Source Lasers Left (Out)',
      8: 'Single Source Lasers Right (Up)',
      9: 'Single Source Lasers Right (Out)',
      10: 'Single Source Lasers Left (Down)',
      11: 'Single Source Lasers Right (Down)',
      12: 'Single Source Lasers Left (Down) / Circle Rotations Top',
      13: 'Single Source Lasers Right (Up) / Circle Rotations Close',
      14: 'Circle Rotations Distant',
      15: 'Circle Rotations Distant 2',
      16: 'Circle Rotations Single Source Left',
      17: 'Circle Rotations Single Source Right',
   },
   TheSecondEnvironment: {
      0: 'Rings Big',
      1: 'Rings Small',
      2: 'Runway Left',
      3: 'Runway Right',
      4: 'Spotlight Left',
      5: 'Spotlight Right',
      6: 'Top Lasers Left Bottom',
      7: 'Top Lasers Right Bottom',
      8: 'Top Lasers Left Top',
      9: 'Top Lasers Right Top',
      10: 'Bottom Lasers Left Bottom',
      11: 'Bottom Lasers Right Bottom',
      12: 'Bottom Lasers Left Top',
      13: 'Bottom Lasers Right Top',
   },
   LizzoEnvironment: {
      0: 'Main Floor',
      1: 'Rainbow Arcs Inner',
      2: 'Rainbow Arcs 2',
      3: 'Rainbow Arcs 3',
      4: 'Rainbow Arcs 4',
      5: 'Rainbow Arcs Outer',
      6: 'Rainbow Rings Left',
      7: 'Rainbow Rings Right',
      8: 'Rainbow Rings Lasers Left',
      9: 'Rainbow Rings Lasers Right',
      10: 'Main Top Lasers',
      11: 'Environment Stands Left',
      12: 'Environment Stands Right',
      13: 'Environment Clouds Left',
      14: 'Environment Clouds Right',
      15: 'Main Left Lasers',
      16: 'Main Right Lasers',
      17: 'Environment Stand Lasers Left',
      18: 'Environment Stand Lasers Right',
      19: 'Rainbow Arcs Laser',
   },
   TheWeekndEnvironment: {
      0: 'Lamps Poles Left',
      1: 'Lamps Poles Right',
      2: 'Lamps Rings Left',
      3: 'Lamps Rings Right',
      4: 'Environment Arrows',
      5: 'Environment Side Lasers Left',
      6: 'Environment Side Lasers Right',
      7: 'Environment Runway Lane',
      8: 'Environment Center Ring',
      9: 'Environment Center Ring Lasers',
      10: 'Windows Left 1 Front',
      11: 'Windows Left 1 Side',
      12: 'Windows Left 2 Side',
      13: 'Windows Left 3 Front',
      14: 'Windows Left 3 Side',
      15: 'Windows Right 1 Front',
      16: 'Windows Right 1 Side',
      17: 'Windows Right 2 Side',
      18: 'Windows Right 3 Front',
      19: 'Windows Right 3 Side',
      20: 'Buildings Left',
      21: 'Buildings Right',
      22: 'Buildings Roof Left',
      23: 'Buildings Roof Right',
      29: 'Lamp Rings Left 1',
      30: 'Lamp Rings Left 2',
      31: 'Lamp Rings Left 3',
      32: 'Lamp Rings Left 4',
      33: 'Lamp Rings Right 1',
      34: 'Lamp Rings Right 2',
      35: 'Lamp Rings Right 3',
      36: 'Lamp Rings Right 4',
      37: 'Buildings Background Left',
      38: 'Buildings Background Right',
      40: 'Buildings Side Buildings',
   },
   RockMixtapeEnvironment: {
      0: 'Lasers Far Left',
      1: 'Lasers Far Right',
      2: 'Mountain 1',
      3: 'Mountain 2',
      4: 'Mountain 3',
      5: 'Mountain 4',
      6: 'Mountain 5',
      7: 'Mountain 6',
      8: 'Mountain 7',
      9: 'Mountain 8',
      10: 'Mountain 9',
      11: 'Mountain 10',
      12: 'Mountain 11',
      13: 'Mountain 12',
      14: 'Face Eyes',
      15: 'Runway Frets',
      16: 'Runway Strings',
      17: 'Runway Tunnel',
      18: 'Lasers Side Left',
      19: 'Lasers Side Right',
      20: 'Lasers Side Left Rotation',
      21: 'Lasers Side Right Rotation',
      22: 'Face Left',
      23: 'Face Right',
      24: 'Spikes Left',
      25: 'Spikes Left Movement',
      26: 'Spikes Right',
      27: 'Spikes Right Movement',
      28: 'Runway Dots',
      29: 'Face Movement',
      30: 'Runway Equilizer',
      31: 'Screens Left 1',
      32: 'Screens Left 2',
      33: 'Screens Right 1',
      34: 'Screens Right 2',
      35: 'Screens Left Movement',
      36: 'Screens Right Movement',
      37: 'Lasers Side Z Translation',
   },
   Dragons2Environment: {
      0: 'Small Rings (R/T)',
      1: 'Small Rings (Colors)',
      2: 'Underground',
      3: 'Big Rings',
      4: 'Top Spotlights',
      5: 'Runway Left',
      6: 'Runway Right',
      7: 'Particles Left',
      8: 'Particles Right',
      9: 'Main Lasers Bottom Left',
      10: 'Main Lasers Top Left',
      11: 'Main Lasers Top Right',
      12: 'Main Lasers Bottom Right',
   },
   Panic2Environment: {
      0: 'Left Cones Local',
      1: 'Right Cones Local',
      2: 'Left Cones Global',
      3: 'Right Cones Global',
      4: 'Center Cones Local',
      5: 'Center Cones Global',
      6: 'Diamond Rings Local Left',
      7: 'Diamond Rings Local Right',
      8: 'Diamond Rings Global',
      9: 'Lasers Bottom Left',
      10: 'Lasers Bottom Right',
      11: 'Lasers Top Left',
      12: 'Lasers Top Right',
      13: 'Runway Lasers Left',
      14: 'Runway Lasers Right',
      15: 'Runway Inner Laser',
      16: 'Spectrogram Left',
      17: 'Spectrogram Right',
      18: 'Runway Lasers Left Transform Z',
      19: 'Runway Lasers Right Transform Z',
      20: 'Window Left Pirces',
      21: 'Window Left Aura',
      22: 'Window Right Pieces',
      23: 'Window Right Aura',
   },
   QueenEnvironment: {
      0: 'Vinyls Left',
      1: 'Vinyl Left 1',
      2: 'Vinyl Left 2',
      3: 'Vinyl Left 3',
      4: 'Vinyl Left 4',
      5: 'Vinyls Right',
      6: 'Vinyl Right 1',
      7: 'Vinyl Right 2',
      8: 'Vinyl Right 3',
      9: 'Vinyl Right 4',
      10: 'Tunnel Rings Wrapper',
      11: 'Distant Circular Lasers Z',
      12: 'Distant Circular Lasers',
      13: 'Top Circular Lasers Rot Y',
      14: 'Top Circular Lasers',
      15: 'Platform Lane Left',
      16: 'Platform Lane Right',
      17: 'Silhouette Contour',
   },
   LinkinPark2Environment: {
      0: 'Circular Lasers Global Distant',
      1: 'Circular Lasers Local Distant',
      2: 'Circular Lasers Global Close',
      3: 'Circular Lasers Local Close',
      4: 'Tunnels Rings',
      5: 'Big Arcs Local',
      6: 'Laser Beams Local Left',
      7: 'Laser Beams Local Right',
      8: 'Floor Lasers Left',
      9: 'Floor Lasers Right',
      10: 'Tunnels Lights',
      11: 'Logo',
      12: 'Big Arcs Global',
      13: 'Spectrograms Floor Left',
      14: 'Spectrograms Floor Right',
      15: 'Spectrograms Tunnel Left',
      16: 'Spectrograms Tunnel Right',
      17: 'Laser Beams Global Left',
      18: 'Laser Beams Global Right',
   },
   TheRollingStonesEnvironment: {
      0: 'Cube Local Left',
      1: 'Cube Local Right',
      2: 'Columns Left 01',
      3: 'Columns Left 02',
      4: 'Columns Left 03',
      5: 'Columns Left 04',
      6: 'Columns Right 01',
      7: 'Columns Right 02',
      8: 'Columns Right 03',
      9: 'Columns Right 04',
      10: 'Floor Blocks Left',
      11: 'Floor Blocks Right',
      12: 'Heart Local Left',
      13: 'Heart Local Right',
      14: 'Lasers Left 01',
      15: 'Lasers Left 02',
      16: 'Lasers Left 03',
      17: 'Lasers Left 04',
      18: 'Lasers Right 01',
      19: 'Lasers Right 02',
      20: 'Lasers Right 03',
      21: 'Lasers Right 04',
      22: 'Columns Lasers 01',
      23: 'Columns Lasers 02',
      24: 'Lasers Left Sphere',
      25: 'Lasers Right Sphere',
      26: 'Cube Global',
      27: 'Heart Global',
      28: 'Logo Local',
      29: 'Logo Global',
      30: 'Splinters',
      31: 'Cube Rot Z Left',
      32: 'Cube Rot Z Right',
      33: 'Heart Rot Z Left',
      34: 'Heart Rot Z Right',
      35: 'Floor Side Laser Left',
      36: 'Floor Side Laser Right',
      37: 'Cube Lasers',
      38: 'Splinters Global Translation',
      39: 'Floor Below Block',
      40: 'Floor Inner Light Left',
      41: 'Floor Inner Light Right',
      42: 'Logo Iridescence',
      43: 'Logo Color',
      44: 'Floor Side Laser Bottom Left',
      45: 'Floor Side Laser Bottom Right',
   },
   LatticeEnvironment: {
      0: 'Bottom Left Global',
      1: 'Bottom Left Cube',
      2: 'Bottom Left Radial',
      3: 'Bottom Left Spot 1',
      4: 'Bottom Left Spot 2',
      5: 'Bottom Left Laser 1',
      6: 'Bottom Left Laser 2',
      7: 'Bottom Right Global',
      8: 'Bottom Right Cube',
      9: 'Bottom Right Radial',
      10: 'Bottom Right Spot 1',
      11: 'Bottom Right Spot 2',
      12: 'Bottom Right Laser 1',
      13: 'Bottom Right Laser 2',
      14: 'Top Left Global',
      15: 'Top Left Cube',
      16: 'Top Left Radial',
      17: 'Top Left Spot 1',
      18: 'Top Left Spot 2',
      19: 'Top Left Laser 1',
      20: 'Top Left Laser 2',
      21: 'Top Right Global',
      22: 'Top Right Cube',
      23: 'Top Right Radial',
      24: 'Top Right Spot 1',
      25: 'Top Right Spot 2',
      26: 'Top Right Laser 1',
      27: 'Top Right Laser 2',
      28: 'Runway Diagonals',
      29: 'Runway Outline',
      30: 'Runway Chevron',
   },
   DaftPunkEnvironment: {
      0: 'Tris Wall Left',
      1: 'Tris Wall Right',
      2: 'Lasers Top Sideset 01 L',
      3: 'Lasers Top Sideset 02 L',
      4: 'Lasers Top Sideset 01 R',
      5: 'Lasers Top Sideset 02 R',
      6: 'Lasers Bottom Sideset 01 L',
      7: 'Lasers Bottom Sideset 02 L',
      8: 'Lasers Bottom Sideset 01 R',
      9: 'Lasers Bottom Sideset 02 R',
      10: 'Lasers Top Wall L',
      11: 'Lasers Top Wall R',
      12: 'Lasers Bottom Wall L',
      13: 'Lasers Bottom Wall R',
      14: 'Orbit 1',
      15: 'Orbit 2',
      16: 'Orbit 3',
      17: 'Orbit 4',
      18: 'Runway Middle',
      19: 'Visor 01 Spectrogram',
      20: 'Visor 02 Spectrogram',
      21: 'Visor 01 Text',
      22: 'Visor 02 Text',
      23: 'Helmet 01',
      24: 'Helmet 02',
      25: 'Runway Left',
      26: 'Runway Right',
      27: 'Background Stars',
      28: 'Orbit 1 Star 1',
      29: 'Orbit 1 Star 2',
      30: 'Orbit 1 Star 3',
      31: 'Orbit 1 Star 4',
      32: 'Orbit 2 Star 1',
      33: 'Orbit 2 Star 2',
      34: 'Orbit 2 Star 3',
      35: 'Orbit 2 Star 4',
      36: 'Orbit 3 Star 1',
      37: 'Orbit 3 Star 2',
      38: 'Orbit 3 Star 3',
      39: 'Orbit 3 Star 4',
      40: 'Orbit 4 Star 1',
      41: 'Orbit 4 Star 2',
      42: 'Orbit 4 Star 3',
      43: 'Orbit 4 Star 4',
      44: 'Orbit 1 Stars Transform',
      45: 'Orbit 2 Stars Transform',
      46: 'Orbit 3 Stars Transform',
      47: 'Orbit 4 Stars Transform',
      48: 'Visor 02 Offset X',
      49: 'Visor 02 Offset Y',
      50: 'Visor 02 Padding X',
      51: 'Visor 02 Padding Y',
      52: 'Visor 01 Offset X',
      53: 'Visor 01 Offset Y',
      54: 'Visor 01 Padding X',
      55: 'Visor 01 Padding Y',
   },
   HipHopEnvironment: {
      0: 'Environment Side Lasers Left',
      1: 'Environment Side Lasers Right',
      2: 'Ceiling Lights Left',
      5: 'Ceiling Lights Right',
      6: 'Trains Long 1 Transforms',
      7: 'Trains Long 1 Color',
      8: 'Trains Long 2 Transforms',
      9: 'Trains Long 2 Color',
      10: 'Trains Short L Transforms',
      11: 'Trains Short L Color',
      12: 'Trains Short R Transforms',
      13: 'Trains Short R Color',
      14: 'Geo Walls',
      15: 'Geo Roof',
      16: 'Geo Platforms',
      17: 'Geo Pillars Left',
      18: 'Geo Pillars Right',
      19: 'Environment Runway Ring',
      20: 'Hoops L1',
      21: 'Hoops Pieces L1',
      22: 'Balls L1',
      23: 'Hoops L2',
      24: 'Hoops Pieces L2',
      25: 'Balls L2',
      26: 'Hoops R1',
      27: 'Hoops Pieces R1',
      28: 'Balls R1',
      29: 'Hoops R2',
      30: 'Hoops Pieces R2',
      31: 'Balls R2',
      32: 'Graffiti Floating Graffiti R',
      33: 'Graffiti Floating Graffiti L',
      34: 'Graffiti Boombox',
      35: 'Graffiti Boombox Shards',
      36: 'Environment Spectrogram Left',
      37: 'Environment Spectrogram Right',
      38: 'Trains Short L Graffiti',
      39: 'Trains Short R Graffiti',
      40: 'Environment Runway Lights',
      41: 'Environment Spectrogram Y',
   },
   ColliderEnvironment: {
      0: 'Center Blocks Local',
      1: 'Center Blocks Global',
      2: 'Center Blocks Inner Lasers',
      3: 'Center Blocks Outer Lasers',
      4: 'Center Blocks Side 01 Lasers',
      5: 'Center Blocks Side 02 Lasers',
      6: 'Colliders Diamonds',
      7: 'Side Blocks Set 01 (Left) Local',
      8: 'Side Blocks Set 02 (Right) Local',
      9: 'Side Blocks Set 01 (Left) Global',
      10: 'Side Blocks Set 02 (Right) Global',
      11: 'Side Blocks Set 01 (Left) Inner Lasers',
      12: 'Side Blocks Set 02 (Right) Inner Lasers',
      13: 'Side Blocks Set 01 (Left) Outer Lasers',
      14: 'Side Blocks Set 02 (Right) Outer Lasers',
      15: 'Side Blocks Set 01 (Left) Side 01 Lasers',
      16: 'Side Blocks Set 02 (Right) Side 01 Lasers',
      17: 'Side Blocks Set 01 (Left) Side 02 Lasers',
      18: 'Side Blocks Set 02 (Right) Side 02 Lasers',
      19: 'Runway Left',
      20: 'Runway Right',
      21: 'Colliders Left',
      22: 'Colliders Right',
      23: 'Chevron Local',
      24: 'Chevron Mask Strength',
      25: 'Center Blocks Mask Strength',
      26: 'Side Blocks Set 01 (Left) Mask Strength',
      27: 'Side Blocks Set 02 (Right) Mask Strength',
   },
};

/**
 * Safely retrieve the name of an event group.
 */
export function eventGroupRename(id: number, environment?: EnvironmentAllName): string {
   return environmentGroupMap[environment!]?.[id] || 'Unknown';
}