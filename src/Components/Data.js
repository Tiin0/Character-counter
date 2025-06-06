import React from "react";

class Data extends React.Component { // Viene dichiarato il componente
    constructor(props) { // Vengono dichiarate le variabili
        super(props);
        this.state = {
            totalWord : 0,
            Sentence  : 0
        }
    }
    render() { // Vengono mostrati i caratteri totali, le parole totali e le frasi totali
        return (
            <div className="w-full flex justify-center  mt-[50px] gap-10 max-sm:flex-col max-sm:items-center max-sm:gap-4">
                <div className='flex flex-col items-center justify-center w-[400px] max-sm:w-[90%] h-[200px] max-sm:h-[150px] bg-violet-400 rounded-lg'>
                    <h2 className="text-4xl font-extrabold">{this.props.totChar}</h2>
                    <h4 className="font-semibold">Total Character</h4>
                    </div>
                <div className='flex flex-col items-center justify-center w-[400px] max-sm:w-[90%] h-[200px] max-sm:h-[150px] bg-yellow-400 rounded-lg'>
                    <h2 className="text-4xl font-extrabold">{this.props.totWords}</h2>
                    <h4 className="font-semibold">Word Count</h4>
                </div>
                <div className='flex flex-col items-center justify-center w-[400px] max-sm:w-[90%] h-[200px] max-sm:h-[150px] bg-orange-400 rounded-lg'>
                    <h2 className="text-4xl font-extrabold">{this.props.totSentence}</h2>
                    <h4 className="font-semibold">Sentence Count</h4>
                </div>
                
            </div>
        )
    }
}

export default Data;