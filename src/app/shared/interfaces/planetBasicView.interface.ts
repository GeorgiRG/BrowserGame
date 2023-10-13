export interface PlanetBasicView {
	planetId: string,
	name: string,
	systemPos: number,
	size: number,
	surfaceTemp: number,
	rareMetals: number,
	metals: number,
	fuels: number,
	organics: number,
	owned: boolean,
	botId: number | null,
	userId: number | null,
	ownerName: string | null,
	ownerFaction: string | null,
	gravity: number,
	atmosphere: number
}