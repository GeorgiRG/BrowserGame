import { Component } from '@angular/core';

@Component({
	selector: 'app-error',
	template: `<!DOCTYPE html>
						<html>
						<app-nav-bar></app-nav-bar>
						<div class="game-content-window">
								<h1>There was an error, please try again!</h1>
						</div>
						</html>`,
	styles: [`.game-content-window{min-height: 50%;}
						h1 {transform: translate(50%, 50%); height:fit-content; width: fit-content;}	
					`]
})
export class ErrorComponent {}
