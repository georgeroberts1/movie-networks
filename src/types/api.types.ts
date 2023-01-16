export interface PersonCredits {
  cast: PersonCast[];
  crew: PersonCast[];
  id: number;
}

export interface PersonCast {
  character?: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: OriginalLanguage;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: null | string;
  overview: string;
  poster_path: null | string;
  department?: Department;
  job?: Job;
}

export interface MovieCredits {
  id: number;
  cast: MovieCast[];
  crew: MovieCast[];
}

export interface MovieCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: Job;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Lighting = "Lighting",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export enum Job {
  ExecutiveProducer = "Executive Producer",
  Producer = "Producer",
}

export enum OriginalLanguage {
  En = "en",
}
