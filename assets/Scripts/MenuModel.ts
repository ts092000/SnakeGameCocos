import { _decorator, AudioSource, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuModel')
export class MenuModel extends Component {
    @property({type:Button})
    private playGame: Button;

    @property({type:AudioSource})
    private musicBg: AudioSource;

    @property({type:Button})
    private muteBtn: Button;

    @property({type:Button})
    private unMuteBtn: Button;
    
    public get PlayGame() : Button {
        return this.playGame
    }
    
    public set PlayGame(playGame : Button) {
        this.playGame = playGame;
    }

    public get MusicBg() : AudioSource {
        return this.musicBg
    }
    
    public set MusicBg(musicBg : AudioSource) {
        this.musicBg = musicBg;
    }

    public get MuteBtn() : Button {
        return this.muteBtn
    }
    
    public set MuteBtn(muteBtn : Button) {
        this.muteBtn = muteBtn;
    }

    public get UnMuteBtn() : Button {
        return this.unMuteBtn
    }
    
    public set UnMuteBtn(unMuteBtn : Button) {
        this.unMuteBtn = unMuteBtn;
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


