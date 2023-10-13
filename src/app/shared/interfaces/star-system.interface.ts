import { PlanetBasicView } from "./planetBasicView.interface";

export interface StarSystem {
	id : number,
	name: string,
	faction: string,
	locationX: number,
	locationY: number,
	totalResources: number,
	size: number,
	freePlanets: number,
	planets: Array<PlanetBasicView>
}