export interface SwephOptions {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  lonG: number;
  lonM: number;
  lonS: number;
  lonEW: string;
  latG: number;
  latM: number;
  latS: number;
  latNS: string;
  houseSystem: string;
}

export interface PlanetData {
  name: string;
  long: number;
  long_s: string;
  lat: number;
  distance: number;
  speed: number;
}

export interface HouseData {
  name: number;
  long: number;
  long_s: string;
}

export interface SwephResult {
  planets: PlanetData[];
  ascmc: { name: string; long: number; long_s: string }[];
  house: HouseData[];
}

/**
 * High level wrapper for the WebAssembly Swiss Ephemeris module.
 */
export class Sweph {
  private module: any;

  private constructor(module: any) {
    this.module = module;
  }

  /**
   * Initialise the wasm module.
   *
   * @param moduleUrl URL of the `astro.mjs` module. Defaults to `./dist/astro.mjs`.
   * @returns a promise that resolves to an instance of {@link Sweph}.
   */
  static async init(moduleUrl = './dist/astro.mjs'): Promise<Sweph> {
    const initModule = (await import(moduleUrl)).default as () => Promise<any>;
    const module = await initModule();
    return new Sweph(module);
  }

  /**
   * Calculate planetary positions and house cusps.
   *
   * @param opts parameters describing date, time and location.
   * @returns parsed result object containing planet and house data.
   */
  get(opts: SwephOptions): SwephResult {
    const res = this.module.ccall(
      'get',
      'string',
      [
        'number',
        'number',
        'number',
        'number',
        'number',
        'number',
        'number',
        'number',
        'number',
        'string',
        'number',
        'number',
        'number',
        'string',
        'string',
      ],
      [
        opts.year,
        opts.month,
        opts.day,
        opts.hour,
        opts.minute,
        opts.second,
        opts.lonG,
        opts.lonM,
        opts.lonS,
        opts.lonEW,
        opts.latG,
        opts.latM,
        opts.latS,
        opts.latNS,
        opts.houseSystem,
      ],
    ) as string;
    return JSON.parse(res);
  }
}
