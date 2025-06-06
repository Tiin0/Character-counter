import React from "react";

class CharDensity extends React.Component { // Viene dichiarato il componente
    constructor(props) { // vengono dichiarate le variabili
        super(props);
        this.state = {
            char: 5,
            displayedValues: []
        };
    }

    componentDidMount() { // Ogni volta che vengono aggiunti nuovi caratteri li aggiorna nella variabile
        this.updateDisplayedValues(this.state.char);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.values !== this.props.values || prevState.char !== this.state.char) {
            this.updateDisplayedValues(this.state.char);
        }
    }

    updateDisplayedValues(charCount) {
        const filteredValues = this.props.values.filter(([letter]) => letter !== ' '); // vengono filtrate le lettere in modo che li spazzi non vengano contati
        const displayedValues = [...filteredValues.slice(0, charCount)]; // Mostra solo il numero di lettere scelto dall'utente

        while (displayedValues.length < charCount) {
            displayedValues.push(['...', 0]); // Se non ci sono lettere viene mostrato ... al loro posto
        }

        this.setState({ displayedValues });
    }

    handleInputChange = (e) => {
        const value = parseInt(e.target.value.trim(), 10) || 1;
        this.setState({ char: value });
    };

    render() { // Codice da mostrare
        return (
            <div className="mt-[50px] w-full mb-[50px] max-sm:w-[90%]">
                {this.state.displayedValues.map(([letter, count], index) => (
                    <div key={index} className="w-full h-[30px] flex items-center mb-[10px]">
                        <h1 className="text-3xl mr-[30px] w-[30px] text-center font-mono max-sm:text-2xl">{letter}</h1>
                        <input 
                            type="range" 
                            min="0" 
                            max="1000" 
                            value={count || 0} 
                            className="w-[100%] h-[10px] appearance-none bg-gray-300 rounded-lg 
                                       [&::-webkit-slider-thumb]:appearance-none 
                                       [&::-webkit-slider-thumb]:w-[20px] 
                                       [&::-webkit-slider-thumb]:h-[20px] 
                                       [&::-webkit-slider-thumb]:bg-violet-600 
                                       [&::-webkit-slider-thumb]:rounded-full" 
                            readOnly
                        />
                        <h1 className="ml-[30px] text-3xl w-[30px] text-right tabular-nums max-sm:text-2xl">{count || 0}</h1>
                    </div>
                ))}
                
                <div className="w-full flex justify-center mt-[50px]">
                    <input 
                        id="showChar"
                        type="number" 
                        className="w-[45px] bg-slate-200 border-b-[1px] border-black rounded-lg text-center outline-none 
                                   [&::-webkit-inner-spin-button]:appearance-none 
                                   [&::-webkit-outer-spin-button]:appearance-none" 
                        placeholder={this.state.char}
                        value={this.state.char}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="showChar" className="ml-[10px]">How many characters do you want to see?</label>
                </div>
            </div>
        );
    }
}

export default CharDensity;
