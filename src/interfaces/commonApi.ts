interface BaseReults {
  id: number,
  name:string,
  url: string,
  created:string
}
interface InfoResponse {
  count: number,
  pages: number,
  next: string,
  prev: string | null
}
export interface PopulatedEpisodesAndCharacters{
  name:string,
  episode:string
  characters:string[]
}
export interface CharacterResult extends BaseReults{
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: BaseReults,
  location: BaseReults,
  image:string,
  episode: string[],
}
export interface EpisodeResult extends BaseReults {
  air_date: string,
  episode: string,
  characters: string[],
}
export interface LocationResult extends BaseReults {
  dimension: string,
  residents: string[],
}
export interface GetResources {
  info:InfoResponse,
  results:CharacterResult[] | EpisodeResult[] | LocationResult[]
}
interface CharResult {
  char: string;
  resource: string;
  count: number;
}
interface EpisodeLocationResult {
  name: string;
  episode: string;
  locations: string[];
}
interface ExerciseResponse {
  exercise_name: string;
  in_time: boolean;
  time: string;
  results: [CharResult | EpisodeLocationResult];
}
export interface CustomApiResponse {
  body: ExerciseResponse;
  status:number
}