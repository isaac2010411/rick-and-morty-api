import { CharacterResult, EpisodeResult, GetResources } from "../../src/interfaces/commonApi";

export type GetEpisodes = GetResources & {
    results:EpisodeResult []
}
export type GetCharacters = GetResources & {
    results:CharacterResult []
}