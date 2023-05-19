import { _decorator, AudioSource, Button, Collider, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type:Node})
    private snakeHead: Node;

    @property({type:Node})
    private foodNode: Node;

    @property({type:Node})
    private snakeNode: Node;

    @property({type:Prefab})
    private snakeBody: Prefab;

    @property({type:Button})
    private playAgain: Button;

    @property({type:Node})
    private food: Node;

    @property({type:Node})
    private gameOverTable: Node;

    @property({type:AudioSource})
    private gameOverSound: AudioSource

    @property({type:AudioSource})
    private eatSound: AudioSource

    @property({type:Button})
    private muteBtn: Button

    @property({type:Button})
    private unMuteBtn: Button
    
    public get SnakeHead() : Node {
        return this.snakeHead;
    }

    public set SnakeHead(snakeHead : Node) {
        this.snakeHead = snakeHead;
    }

    public get SnakeNode() : Node {
        return this.snakeNode;
    }

    public set SnakeNode(snakeNode : Node) {
        this.snakeNode = snakeNode;
    }

    public get FoodNode() : Node {
        return this.foodNode;
    }

    public set FoodNode(foodNode : Node) {
        this.foodNode = foodNode;
    }

    public get SnakeBody() : Prefab {
        return this.snakeBody;
    }

    public set SnakeBody(snakeBody : Prefab) {
        this.snakeBody = snakeBody;
    }

    public get Food() : Node {
        return this.food;
    }

    public set Food(food : Node) {
        this.food = food;
    }

    public get PlayAgain() : Button {
        return this.playAgain;
    }

    public set PlayAgain(playAgain : Button) {
        this.playAgain = playAgain;
    }

    public get GameOverTable() : Node {
        return this.gameOverTable;
    }

    public set GameOverTable(gameOverTable : Node) {
        this.gameOverTable = gameOverTable;
    }

    public get GameOverSound() : AudioSource {
        return this.gameOverSound;
    }

    public set GameOverSound(gameOverSound : AudioSource) {
        this.gameOverSound = gameOverSound;
    }

    public get EatSound() : AudioSource {
        return this.eatSound;
    }

    public set EatSound(eatSound : AudioSource) {
        this.eatSound = eatSound;
    }

    public get MuteBtn() : Button {
        return this.muteBtn;
    }

    public set MuteBtn(muteBtn : Button) {
        this.muteBtn = muteBtn;
    }

    public get UnMuteBtn() : Button {
        return this.unMuteBtn;
    }

    public set UnMuteBtn(unMuteBtn : Button) {
        this.unMuteBtn = unMuteBtn;
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


