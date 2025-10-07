import {Component, useState, useEffect} from 'react';
import './App.css';

// реализация на манеру классового компонента, поэтому закоментировано
// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }
// // 165-й урок, эффекты на манеру классовых компонентов 15-23 строки
//     componentDidMount(){
//         document.title = `Slide: ${this.state.slide}`;
//         console.log('slide changed');
//     }

//     componentDidUpdate () {
//         document.title = `Slide: ${this.state.slide}`;
//         console.log('slide changed');
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
            
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//         )
//     }
// }


const Slider = (props) => {

    // это код из 164-го урока useState. Альтернативный метод useState-a,
    // один useState объединяющий 2 состояния в один объект.
    // но есть нюансы, надо пересоздавать корректный объект каждый раз, через разворот объекта

    // const [state, setState] = useState({autoplay: false, slide:0});

    // function changeSlide (i) {
    //     setState(state=>({...state, slide: state.slide + i}));
    // }
    // function toggleAutoplay () {
    //     setState(state=>({...state, autoplay: !state.autoplay}));
    // }
    
    // это код из 165-го урока useEffect

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState();

    function logging () {
        console.log('log!');
    }

    useEffect(()=>{
        console.log('effect updated');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);
        return () => {
            window.removeEventListener('click', logging);
        }
    },[slide]); 
    // [slide] теперь данный эффект следит исключительно за состоянием slide
    // и меняется только при его изменении, а не при изменнении любого state
    // как это было раньше.
    // Строки 89-91 возвращают анонимную ф-ю кот-я исп-ся для отписки
    // которая запускается при отмонтировании компонента 
    // или перед повторным запуском эффекта.

    useEffect(()=>{
        console.log('componentDidMount emulation');
        document.title = `Slide: ${slide}`;
    },[]); 

    useEffect(()=>{
        console.log('autoplay');
    },[autoplay]); 

    function changeSlide (i) {
        setSlide(slide => slide + i);
    }
    function toggleAutoplay () {
        setAutoplay(autoplay => !autoplay);
    }


    return (
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null} </div>
                
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={()=>changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={()=>changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
    )
}


function App() {
    const [slider, setSlider] = useState(true);

  return (
        <>
            <button onClick={()=>setSlider(!slider)}>CLick</button>
            {slider ? <Slider/> : null}
        </>
  );
}

export default App;
