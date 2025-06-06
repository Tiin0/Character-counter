import React from "react";
import logo from '../Images/logo.png';
import logo2 from '../Images/logo-2.png';
import light from '../Images/light.png';

class NavBar extends React.Component { // Viene dichiarato il componente
    constructor(props) { // Vengono dichiarate le variabili
        super(props);
        this.changeLightMode = this.changeLightMode.bind(this);
        this.state = {
            isDark: document.body.classList.contains("dark")
        };
    }

    componentDidMount() {
        this.observer = new MutationObserver(() => {
            this.setState({ isDark: document.body.classList.contains("dark") });
        });

        this.observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
 
    changeLightMode() { // Qiando l'icono della lampadina viene premuta, cambia il tema da chiaro a scuro
       document.body.classList.toggle('dark');
    }

    render() { // Codice da mostrare nella pagina
        return (
            <div className="h-[100px] w-full flex items-center justify-between px-6">
                <div className="w-[200px] max-sm:w-[150px]">
                    <img 
                        src={this.state.isDark ? logo2 : logo} 
                        alt="logo" 
                        className="w-full h-auto object-contain"
                    />
                </div>

                <div 
                    className="bg-slate-200 rounded-lg h-[50px] w-[50px] flex items-center justify-center cursor-pointer max-sm:w-[35px] max-sm:h-[35px]"
                    onClick={this.changeLightMode}
                >
                    <img 
                        src={light} 
                        alt="light mode" 
                        className="w-[70%] h-full object-contain"
                    />
                </div>
            </div>
        );
    }
}

export default NavBar;
