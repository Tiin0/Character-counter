import React from "react";
import Data from "./Data";
import CharDensity from "./CharDensity";


class Field extends React.Component {  // Si dichiara il componente
    constructor(props) {
        super(props);
        this.state = {  // Si dichiarano le variabili
            newText : '',
            text: '',
            numChar: Infinity,
            words: 0,
            time: 0,
            mappedLetters : new Map(),
            orderedLetters : [],
            excludeSpace: false,
            charLimit: false
        };
        this.changeTime = this.changeTime.bind(this); 
        this.handleKeyPressed = this.handleKeyPressed.bind(this);  
        this.updateDensity = this.updateDensity.bind(this);
    }

    changeTime() {   // Aggiorna il tempo di lettura ogni volta che viene inserito un carattere oppure venga spuntata la checkbox di non contare gli spazzi
        const char = this.state.newText;
        const numChar = this.state.numChar;

        let filteredText = this.state.charLimit ? char.slice(0, numChar) : char;
        let noSpace = this.state.excludeSpace ? filteredText.replace(/\s+/g, '') : filteredText;
        let word = filteredText.length - filteredText.replace(/\s+/g, '').length;
        const characterPerMinut = 1200;
        const minut = noSpace.length / characterPerMinut;
        const averageTime = minut < 1 ? `${Math.ceil(minut * 60)} sec` : `${Math.ceil(minut)} min`;

        this.setState({
            newText: filteredText,
            time: averageTime,
            words: word
        }, ()=> {
            this.handleKeyPressed();
        });
    }

    handleKeyPressed() {  // Aggiorna l'elenco di caratteri ogni volta che ne viene inserito uno
        const newText = this.state.newText;
        const oldText = this.state.text;

        if (oldText < newText) {
            const lastLetters = newText.slice(oldText.length);
            this.setState((prev) => {
                let updatedMap = new Map(prev.mappedLetters);
                for (let char of lastLetters) {
                    if (updatedMap.has(char) && updatedMap.get(char) > 0) {
                        updatedMap.set(char, updatedMap.get(char) + 1);
                    } else {
                        updatedMap.set(char, 1);
                    }
                }
                return {text: newText, mappedLetters: updatedMap};
            }, ()=> {
                this.updateDensity();
            })
        } else {
            const lastLetters = oldText.slice(newText.length);
            this.setState((prev) => {
                let updatedMap = new Map(prev.mappedLetters);
                for (let char of lastLetters) {
                updatedMap.set(char, updatedMap.get(char) - 1);
                updatedMap.get(char) === 0 && updatedMap.delete(char);
                }
                return {text: newText, mappedLetters: updatedMap};
            }, ()=> {
                this.updateDensity();
            })
        }
    }
    

    updateDensity() { // Riordina l'elenco in modo che le lettere siano disposte dalla piu presente a quella meno
        let letters = [...this.state.mappedLetters.entries()].sort((a,b) => b[1] - a[1]);
        this.setState({
            orderedLetters : letters
        })
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.charLimit !== this.state.charLimit ||
            prevState.excludeSpace !== this.state.excludeSpace
        ) {
            this.changeTime();
        }
    }

    render() { // Codice da mostrare nella pagina
        return (
            <div className="flex flex-col items-center w-full h-auto ">
                <h1 className='text-5xl font-extrabold max-w-[14ch] text-center leading-[55px] max-sm:text-4xl max-mm:text-[40px] ' >Analyzing Your text in real-time.</h1>
                <textarea
                    className=" w-full h-[250px] mt-[30px] rounded-[25px] bg-slate-200 pl-4 pt-2 max-sm:w-[90%] min-lg:h-[350px] "
                    value={this.state.newText}
                    placeholder="Write your text"
                    onChange={(e) => {
                        this.setState({ newText: e.target.value}, () => {
                            this.changeTime();
                        });
                    }}
                />
            
                <div className='w-full flex max-mm:block max-sm:block max-sm:w-[90%] mt-[10px] '>
                    <div>
                <input 
                    type="number" 
                    className="w-[45px] bg-slate-200 max-mm:float-end border-b-[1px] border-black rounded-lg text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden " 
                    placeholder="limit"
                    value={this.state.numChar === Infinity ? '' : this.state.numChar} 
                    onChange={(e) => {
                        const value = e.target.value.trim();
                        this.setState({ numChar: value });
                    }}
                />
                    <input
                        className='ml-[20px] max-mm:ml-0'
                        type="checkbox"
                        id='charLimit'
                        onChange={() => this.setState((prev) => ({ charLimit: !prev.charLimit }))}
                    /> 
                    <label htmlFor="charLimit" className="mr-10 font-semibold"> Set Character Limit</label>
                    </div>
                    <div>                
                    <input
                        type="checkbox"
                        id='exSpaces'
                        onChange={() => this.setState((prev) => ({ excludeSpace: !prev.excludeSpace }))}
                    />    
                    <label htmlFor="exSpaces" className="font-semibold"> Exclude Spaces</label>
                    </div>  
                    <h3 className="ml-auto mr-[20px] font-semibold">Reading time: {this.state.time}</h3>
                </div>
                <Data totChar={this.state.text.length} totWords={this.state.words} totSentence={this.state.mappedLetters.get('.') || 0} /> 
                <CharDensity values={this.state.orderedLetters}/>
            </div>
        );
    }
}

export default Field;
