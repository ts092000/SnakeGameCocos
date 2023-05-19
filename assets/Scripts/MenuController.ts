import { _decorator, Component, Node, Button, director } from 'cc';
import { MenuModel } from './MenuModel';
import { MenuView } from './MenuView';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property({type:MenuModel})
    private MenuModel: MenuModel

    @property({type:MenuView})
    private MenuView: MenuView

    private snakeVolumeArray: number[] = [];

    protected onLoad(): void {
        this.MenuModel.MusicBg.play();
        director.resume();
        this.MenuModel.PlayGame.node.on(Button.EventType.CLICK, this.playGame, this);
        this.MenuModel.UnMuteBtn.node.on(Button.EventType.CLICK, this.unMute, this);
        this.MenuModel.MuteBtn.node.on(Button.EventType.CLICK, this.mute, this);
    }

    protected start() {
        let snakeVolumeArray1 = localStorage.getItem('snakeVolumeArray');
        localStorage.setItem('snakeVolumeArray', JSON.stringify(this.snakeVolumeArray));
        
        if (snakeVolumeArray1) {
            this.snakeVolumeArray = JSON.parse(snakeVolumeArray1);
            localStorage.setItem('snakeVolumeArray', JSON.stringify(this.snakeVolumeArray));
        }
        if (this.snakeVolumeArray.length == 0) {
            this.MenuModel.MusicBg.volume = 0.7;
            this.snakeVolumeArray.push(this.MenuModel.MusicBg.volume);
        }
        else {
            this.MenuModel.MusicBg.volume = this.snakeVolumeArray[this.snakeVolumeArray.length - 1];
        }

        if (this.MenuModel.MusicBg.volume == 0.7) {
            this.MenuModel.MuteBtn.node.active = false;
            this.MenuModel.UnMuteBtn.node.active = true;
        }
        
        if (this.MenuModel.MusicBg.volume == 0) {
            this.MenuModel.MuteBtn.node.active = true;
            this.MenuModel.UnMuteBtn.node.active = false;
        }
    }

    protected update(deltaTime: number) {
        
    }
    
    private playGame (button: Button) {
        
        director.loadScene('Game');
    }

    private mute (button: Button) {
        this.MenuModel.MusicBg.volume = 0.7;
        this.MenuModel.UnMuteBtn.node.active = true;
        this.MenuModel.MuteBtn.node.active = false;
        this.snakeVolumeArray.push(this.MenuModel.MusicBg.volume);
        localStorage.setItem('snakeVolumeArray', JSON.stringify(this.snakeVolumeArray));
    }

    private unMute (button: Button) {
        this.MenuModel.MusicBg.volume = 0;
        this.MenuModel.UnMuteBtn.node.active = false;
        this.MenuModel.MuteBtn.node.active = true;
        this.snakeVolumeArray.push(this.MenuModel.MusicBg.volume);
        localStorage.setItem('snakeVolumeArray', JSON.stringify(this.snakeVolumeArray));
    }
}


