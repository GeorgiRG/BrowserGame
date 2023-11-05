import { Component } from '@angular/core';

@Component({
	selector: 'app-loading',
	template: `<!DOCTYPE html>
						<html>
							<app-nav-bar></app-nav-bar>
							<div class="game-content-window">
								<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"
									viewBox="0 0 24 24">
									<path fill="white"
										d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
										/>
									<path fill="lightblue" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
										<animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
									</path>
								</svg>
							</div>
						</html>`,
	styles: [`.game-content-window{min-height: 50%;}
						h1 {transform: translate(50%, 50%); height:fit-content; width: fit-content;}
						svg {transform: translate(20vw);}	
					`]
})
export class LoadingComponent { }
