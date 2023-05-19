import { _decorator, Component, Node , Vec3, input, Input, EventKeyboard, KeyCode, Collider, instantiate, randomRange, Collider2D, Contact2DType, IPhysics2DContact, RigidBodyComponent, RigidBody2D, Vec2, director, Button} from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameModel})
    private GameModel: GameModel;

    @property({type:GameView})
    private GameView: GameView;

    private snakeBodyArray: Node[] = [];
    private direction: Vec3 = new Vec3(2, 0, 0);
    private input: Vec3 ;
    public initialSize: number = 1;

    private snakeHighScoreArray: number[] = [];
    private snakeVolumeArray: number[] = [];
    private score: number = 0;

    protected start() {
        this.randomizeFoodPos();
        this.resetState();
        let snakeHead = this.GameModel.SnakeHead.getComponent(Collider2D);
        if (snakeHead) {
            snakeHead.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        let snakeHighScoreArray1 = localStorage.getItem('snakeHighScoreArray');
        let snakeVolumeArray1 = JSON.parse(localStorage.getItem('snakeVolumeArray'));

        if (snakeHighScoreArray1) {
            this.snakeHighScoreArray = JSON.parse(snakeHighScoreArray1);
            localStorage.setItem('snakeHighScoreArray', JSON.stringify(this.snakeHighScoreArray));
        }

        if (snakeHighScoreArray1.length == 0) {
            this.GameModel.GameOverSound.volume = 0.7;
            this.GameModel.EatSound.volume = 0.7;
        }
        else {
            this.GameModel.GameOverSound.volume = snakeVolumeArray1[ snakeVolumeArray1.length - 1];
            this.GameModel.EatSound.volume = snakeVolumeArray1[ snakeVolumeArray1.length - 1];
        }

        if (this.GameModel.GameOverSound.volume == 0.7) {
            this.GameModel.MuteBtn.node.active = true;
            this.GameModel.UnMuteBtn.node.active = false;
        }
        
        if (this.GameModel.GameOverSound.volume == 0) {
            this.GameModel.MuteBtn.node.active = false;
            this.GameModel.UnMuteBtn.node.active = true;
        }        
        
    }

    protected update(deltaTime: number) {
        if (this.direction.x != 0) {
            input.on(Input.EventType.KEY_DOWN, this.moveSnakeUpDown, this);
            input.off(Input.EventType.KEY_DOWN, this.moveSnakeLeftRight, this);
        }
        else if (this.direction.y != 0) {
            input.off(Input.EventType.KEY_DOWN, this.moveSnakeUpDown, this);
            input.on(Input.EventType.KEY_DOWN, this.moveSnakeLeftRight, this);
        }
    }

    protected lateUpdate(dt: number): void {
        if (this.input != Vec3.ZERO) {
            this.direction = this.input;
        }

        for (let i = this.snakeBodyArray.length - 1; i > 0; i--) {
            this.snakeBodyArray[i].position = this.snakeBodyArray[i-1].position;
        }
    
        this.GameModel.SnakeHead.setPosition(new Vec3
            (Math.round(this.GameModel.SnakeHead.position.x) + this.direction.x,
            Math.round(this.GameModel.SnakeHead.position.y) + this.direction.y,
            0)
        );
        this.checkOver();
        for (let i = 1; i <= this.snakeBodyArray.length; i++) {
            if (this.GameModel.SnakeHead.position.x <= this.snakeBodyArray[i].position.x + 2
                && this.GameModel.SnakeHead.position.x >= this.snakeBodyArray[i].position.x - 2
                && this.GameModel.SnakeHead.position.y <= this.snakeBodyArray[i].position.y + 2
                && this.GameModel.SnakeHead.position.y >= this.snakeBodyArray[i].position.y - 2)
            {
                this.gameOverAction();
            }
        }

        
    }

    protected onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.moveSnakeUpDown, this);
        input.on(Input.EventType.KEY_DOWN, this.moveSnakeLeftRight, this);
        this.GameModel.PlayAgain.node.on(Button.EventType.CLICK, this.playAgain, this);
        this.GameModel.MuteBtn.node.on(Button.EventType.CLICK, this.muteBtn, this);
        this.GameModel.UnMuteBtn.node.on(Button.EventType.CLICK, this.unMuteBtn, this);
    }

    private resetState() {
        // console.log(this.snakeBodyArray)
        // snakeBodyNode = this.snakeBodyArray[this.snakeBodyArray.length - 1];
        // console.log(snakeBodyNode.position);
        // console.log(this.snakeBodyArray);
        // snakeBodyNode.setPosition(new Vec3(snakeBodyNode.position.x, snakeBodyNode.position.y, 0));
        this.input = new Vec3(4, 0, 0);
        this.GameModel.SnakeHead.position = Vec3.ZERO;
        this.score = 0;
        this.GameView.Score.string = 'Score: ' + this.score.toString();

        // Start at 1 to skip destroying the head
        for (let i = 0; i < this.snakeBodyArray.length; i++) {
            this.snakeBodyArray[i].destroy();
        }

        // Clear the list but add back this as the head
        this.snakeBodyArray = []
        this.snakeBodyArray.push(this.GameModel.SnakeHead);

        // -1 since the head is already in the list
        for (let i = 0; i < this.initialSize - 1; i++) {
            this.GrowSnake();
        }
    }

    private moveSnakeUpDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_W:
                this.input = new Vec3(0, 4, 0);
                this.GameModel.SnakeHead.angle = 90;
                break;
            case KeyCode.ARROW_UP:
                this.input = new Vec3(0, 4, 0);
                this.GameModel.SnakeHead.angle = 90;
                break;
            case KeyCode.KEY_S:
                this.input = new Vec3(0, -4, 0);
                this.GameModel.SnakeHead.angle = -90;
                break;
            case KeyCode.ARROW_DOWN:
                this.input = new Vec3(0, -4, 0);
                this.GameModel.SnakeHead.angle = -90;
                break;
        }
    }

    private moveSnakeLeftRight(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.input = new Vec3(-4, 0, 0)
                this.GameModel.SnakeHead.angle = 180;
                break;
            case KeyCode.ARROW_LEFT:
                this.input = new Vec3(-4, 0, 0)
                this.GameModel.SnakeHead.angle = 180;
                break;
            case KeyCode.KEY_D:
                this.input = new Vec3(4, 0, 0)
                this.GameModel.SnakeHead.angle = 0;
                break;
            case KeyCode.ARROW_RIGHT:
                this.input = new Vec3(4, 0, 0)
                this.GameModel.SnakeHead.angle = 0;
                break;
        }
    }

    private onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        // console.log('1');
        if (otherCollider.tag == 1) {
            this.randomizeFoodPos();
            this.GrowSnake();
            this.GameModel.EatSound.play();
            console.log('Hit Food');   
        }
    }

    private randomizeFoodPos() {
        let x = randomRange(-450, 450);
        let y = randomRange(-275, 195);
        this.GameModel.Food.setPosition(new Vec3(Math.round(x), Math.round(y), 0));
        this.GameModel.Food.getComponent(Collider2D).apply();
    }

    private GrowSnake() {
        let snakeBodyNode = instantiate(this.GameModel.SnakeBody);
        this.GameModel.SnakeNode.addChild(snakeBodyNode);
        // let bodyX = snakeBodyNode.position.x;
        // let bodyY = snakeBodyNode.position.y;
        // bodyX = this.snakeBodyArray[this.snakeBodyArray.length - 1].position.x - 20;
        // bodyY = this.snakeBodyArray[this.snakeBodyArray.length - 1].position.y - 20;
        snakeBodyNode.position = this.snakeBodyArray[this.snakeBodyArray.length - 1].position;
        // snakeBodyNode.setPosition(new Vec3(bodyX, bodyY, 0));
        this.snakeBodyArray.push(snakeBodyNode);
        console.log(this.snakeBodyArray);
        console.log(snakeBodyNode.position);
        this.score++;
        this.GameView.Score.string = 'Score: ' + this.score.toString();
        // this.GameModel.Food.getComponent(Collider2D).apply();
    }

    private checkOver() {
        if (this.GameModel.SnakeHead.position.x > 450 ||
            this.GameModel.SnakeHead.position.x < -450 ||
            this.GameModel.SnakeHead.position.y < -275 ||
            this.GameModel.SnakeHead.position.y > 195) {
            this.gameOverAction();
        }
    }

    private gameOverAction() {
        console.log('GameOver');
        this.GameModel.PlayAgain.node.active = true;
        this.GameView.GameOverTable.active = true;
        this.snakeHighScoreArray.push(this.score);
        this.GameView.CurrentScore.string = 'Score: ' + this.score.toString();
        localStorage.setItem('snakeHighScoreArray', JSON.stringify(this.snakeHighScoreArray));
        this.GameView.BestScore.string = 'Best Score: ' + Math.max(...this.snakeHighScoreArray).toString();
        this.GameModel.GameOverSound.play();
        director.pause();
    }

    playAgain (button: Button) {
        director.loadScene('Menu');
    }

    private muteBtn(BtnMute: Button) {
        this.GameModel.MuteBtn.node.active = false;
        this.GameModel.UnMuteBtn.node.active = true;
        this.GameModel.GameOverSound.volume = 0;
        this.GameModel.EatSound.volume = 0;
        this.snakeVolumeArray.push(this.GameModel.GameOverSound.volume);
        localStorage.setItem('snakeVolumeArray', JSON.stringify(this.snakeVolumeArray));
    }

    private unMuteBtn(BtnUnmute: Button) {
        this.GameModel.MuteBtn.node.active = true;
        this.GameModel.UnMuteBtn.node.active = false;
        this.GameModel.GameOverSound.volume = 0.7;
        this.GameModel.EatSound.volume = 0.7;
        this.snakeVolumeArray.push(this.GameModel.GameOverSound.volume);
        localStorage.setItem('snakeVolumeArray', JSON.stringify(this.snakeVolumeArray));
    }
}


