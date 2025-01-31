import { Dialog, DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { gameManager, GameManager } from "src/app/game/businesslogic/GameManager";
import { EditionData } from "src/app/game/model/data/EditionData";
import { RoomData } from "src/app/game/model/data/RoomData";
import { ScenarioData } from "src/app/game/model/data/ScenarioData";
import { SectionDialogComponent } from "../section/section-dialog";
import { ScenarioSummaryComponent } from "../summary/scenario-summary";

@Component({
    selector: 'ghs-scenario-dialog',
    templateUrl: './scenario-dialog.html',
    styleUrls: ['./scenario-dialog.scss']
})
export class ScenarioDialogComponent {

    gameManager: GameManager = gameManager;

    constructor(private dialogRef: DialogRef, private dialog: Dialog) { }

    finishScenario(success: boolean) {
        this.dialogRef.close();
        this.dialog.open(ScenarioSummaryComponent, {
            panelClass: 'dialog',
            data: success
        })
    }

    resetScenario() {
        if (gameManager.game.scenario) {
            this.dialogRef.close();
            gameManager.stateManager.before("resetScenario", ...gameManager.scenarioManager.scenarioUndoArgs());
            gameManager.roundManager.resetScenario();
            gameManager.scenarioManager.setScenario(gameManager.game.scenario)
            gameManager.stateManager.after();
        }
    }

    cancelScenario() {
        this.dialogRef.close();
        gameManager.stateManager.before("cancelScenario", ...gameManager.scenarioManager.scenarioUndoArgs());
        gameManager.scenarioManager.setScenario(undefined);
        gameManager.stateManager.after(1000);
    }

    openRoom(roomData: RoomData) {
        const scenario = gameManager.game.scenario;
        if (scenario) {
            const editionData: EditionData | undefined = gameManager.editionData.find((value) => gameManager.game.scenario && value.edition == gameManager.game.scenario.edition);

            if (!editionData) {
                console.error("Could not find edition data!");
                return;
            }
            gameManager.stateManager.before(roomData.marker ? "openRoomMarker" : "openRoom", scenario.index, "data.scenario." + scenario.name, '' + roomData.ref, roomData.marker || '');
            gameManager.scenarioManager.openRoom(roomData, scenario, false);
            gameManager.stateManager.after();
        }
    }

    addSection(sectionData: ScenarioData) {
        this.dialog.open(SectionDialogComponent,
            {
                panelClass: 'dialog',
                data: sectionData
            }).closed.subscribe({
                next: (added) => {
                    if (added) {
                        this.dialogRef.close();
                    }
                }
            });
    }
}
