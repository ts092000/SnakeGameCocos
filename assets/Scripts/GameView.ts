import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Label})
    private score: Label

    @property({type:Node})
    private gameOverTable: Node

    @property({type:Label})
    private currentScore: Label

    @property({type:Label})
    private bestScore: Label

    public get Score() : Label {
        return this.score; 
    }
    
    public set Score(score : Label) {
        this.score = score;
    }
    
    public get GameOverTable() : Node {
        return this.gameOverTable; 
    }
    
    public set GameOverTable(gameOverTable : Node) {
        this.gameOverTable = gameOverTable;
    }

    public get CurrentScore() : Label {
        return this.currentScore; 
    }
    
    public set CurrentScore(currentScore : Label) {
        this.currentScore = currentScore;
    }
    
    public get BestScore() : Label {
        return this.bestScore; 
    }
    
    public set BestScore(bestScore : Label) {
        this.bestScore = bestScore;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


