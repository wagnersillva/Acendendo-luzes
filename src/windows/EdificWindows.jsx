import React, { Component } from 'react'
import './windows.css'

const windows_edific = [
    { "window": 1 },
    { "window": 2 },
    { "window": 3 },
    { "window": 4 },
    { "window": 5 },
    { "window": 6 },
    { "window": 7 },
    { "window": 8 },
    { "window": 9 },
    { "window": 10 },
    { "window": 11 },
    { "window": 12 },
]

const options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0
  };
  

class EdificWindows extends Component {
    constructor() {
        super()
        this.state={
            latitude:'',
            longitude:''
        }
        this.renderWindows = this.renderWindows.bind(this)
        this.mudandoCorPeloPainelDeControle = this.mudandoCorPeloPainelDeControle.bind(this)
        this.PainelDeControle = this.PainelDeControle.bind(this)
        this.mudandoCor = this.mudandoCor.bind(this)
        this.success = this.success.bind(this)
        this.error = this.error.bind(this)
        this.sunriseSunset = this.sunriseSunset.bind(this)
        this.tratandoHoras = this.tratandoHoras.bind(this)
        this.mudandoCena = this.mudandoCena.bind(this)
    }

    success(pos) {
        var crd = pos.coords;
        this.setState({latitude: crd.latitude, longitude: crd.longitude})
        this.sunriseSunset(this.state.latitude, this.state.longitude);
      };
      
    error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }
      
    tratandoHoras(sunrise,sunset){
        let horaSolNascer = new Date(sunrise)
        let horaSolSePoe = new Date(sunset)
        let HoraAtual = new Date().getHours()
        return [horaSolNascer.getHours(), horaSolSePoe.getHours(),HoraAtual]
    }

    sunriseSunset(latitude, longitude){
        fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
            .then(res=> res.json())
            .then(resp=> this.tratandoHoras(resp.results.sunrise, resp.results.sunset))
            .then(resp => this.mudandoCena(resp))
    }

    mudandoCena(array){
        let SolNasce = array[0];
        let SolSePoe = array[1]
        let HoraAtual = array[2]
        let App = document.getElementById('App')
        let sol = document.getElementById('sol')
        let lua = document.getElementById('lua')
        if(HoraAtual>SolNasce && HoraAtual<SolSePoe){
            App.classList.add('appSunrise')
            App.classList.remove('appSunset')
            lua.classList.add('display-none')
            sol.classList.remove('display-none')
            this.mudandoCorPeloPainelDeControle(13, 0)
        }else {
            App.classList.remove('appSunrise')
            App.classList.add('appSunset')
            lua.classList.remove('display-none')
            sol.classList.add('display-none')
            this.mudandoCorPeloPainelDeControle(13, 1)
        }
    }
    
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.success, this.error, options);
    }

    renderWindows() {
        return (
            windows_edific.map((value, index) => {
                return (
                    <div onClick={e => {
                        e.preventDefault()
                        this.mudandoCor(e.target)
                    }} key={index} className="window window-ligthOff" id={`window${index}`}>
                    </div>
                )
            })
        )
    }

    PainelDeControle(param) {
        return (
            windows_edific.map((value, index) => {
                return (
                    <div key={index} className="windowControl" id={`windowControl-${index}`}>
                        <div className='liga-desliga'>
                            <span onClick={e => {
                                e.preventDefault()
                                this.mudandoCorPeloPainelDeControle(index, 1)
                            }}>Ligar</span>
                            <span onClick={e => {
                                e.preventDefault()
                                this.mudandoCorPeloPainelDeControle(index, 0)
                            }}>desligar</span>
                        </div>
                    </div>
                )
            })
        )
    }

    mudandoCor(e) {
        if (e.className === "window window-ligthOff") {
            e.className = "window window-ligthOn"
        } else {
            e.className = "window window-ligthOff"
        }
    }

    mudandoCorPeloPainelDeControle(index, param) {
        let elem = ''
        if (index !== 13) {
            elem = document.getElementById(`window${index}`)
            if (param) {
                elem.classList.remove('window-ligthOff')
                elem.classList.add('window-ligthOn')
            } else {
                elem.classList.add('window-ligthOff')
                elem.classList.remove('window-ligthOn')
            }
        } else if(param){
            for(let i = 0; i < 12; i++) {
                document.getElementById(`window${i}`).classList.remove('window-ligthOff')
                document.getElementById(`window${i}`).classList.add('window-ligthOn')
            }
        } else {
            for(let i = 0; i < 12; i++) {
                document.getElementById(`window${i}`).classList.add('window-ligthOff')
                document.getElementById(`window${i}`).classList.remove('window-ligthOn')
            }
        }
    }

    render() {
        return (
            <div>
                <div className="predioEstrutura">
                    <div className="sol" id="sol"></div>
                    <div className="display-none lua" id="lua">
                    </div>
                    <div className="pinturadomeio"></div>
                    <div className="alpendes">
                        <div className="apende1"></div>
                        <div className="apende2"></div>
                        <div className="apende3"></div>
                    </div>
                    <div className="porta">
                        <div className="part1"></div>
                        <div className="part2"></div>
                    </div>
                    <div className="pista"></div>
                    <div className="grama"></div>
                </div>
                <section className="windows">
                    {this.renderWindows()}
                </section>
                <section className="painel-control">
                    <h2>Painel control</h2>
                    <div className="control " id={`control-geral`}>
                        <p>Geral</p>
                        <div>
                            <span onClick={e => {
                                e.preventDefault()
                                this.mudandoCorPeloPainelDeControle(13, 1)
                            }}>
                                Ligar
                            </span>
                            <span onClick={e => {
                                e.preventDefault()
                                this.mudandoCorPeloPainelDeControle(13, 0)
                            }}>
                                desligar
                            </span>
                        </div>
                    </div>
                    <div className="painel">
                        {this.PainelDeControle()}
                    </div>
                </section>
            </div>
        )
    }

}

export default EdificWindows;