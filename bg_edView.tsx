import React, { Component } from 'react';
import {View,
 Text,
 Dimensions,
 Alert
} from 'react-native';

const rgbHex = require('rgb-hex');

const windowWidth = Dimensions.get("window").width;
const mininumWindowWidth = 320;

let allHexedColors: [string] = [];
let allDimensedviews = [];


export default class BgEdView extends Component{

   static defaultProps = {
       tekst: "bacin",
       bottomHeight: 30,
       lineColor: "r",
   }

   
   green = false;
   blue = false;

   constructor(prop){
       super(prop);

       this.state = {
           len: null,
           getFunctionMode: false,
           green: false,
           blue: false,
           lineColor: null
       }

       if (prop === "getFunctionMode"){
        this.state = {
            getFunctionMode: true
        }

       }




        if (prop === "green"){
            
                this.green= true
            

    
           }      

           if (prop === "blue"){
            this.blue= true

            
    
           }       

           


              

       this.suitableViewHeight = Math.round(this.props.bottomHeight/3)
       // refuge to up zero

       if (this.suitableViewHeight === 0) { this.suitableViewHeight = 1 }


       

   }

   _render = (Component) => {
       return Component;
   }


   _afterRender = (bottomHeight) => {

    this.suitableViewHeight = Math.round(bottomHeight/3)
    // refuge to up zero

    if (this.suitableViewHeight === 0) { this.suitableViewHeight = 1 }

    this._makeAllColorWithHex()
    this._increaseCompUp2Bigger(windowWidth, allHexedColors)

    return this._renderFx();
}

   _addComponent = (Componentt, ExpComponent) => {
       return (<View
       style = {{
           flexDirection: 'row'
       }}
       >
           {Componentt}
           {ExpComponent}           
           </View>
           );
   }

   _nullReturn = () => {
       return(<View></View>);
   }

   _joinComponents = (arrayedComponents) => {
    let Componentss = this._nullReturn()
    for (let i = 0; i < arrayedComponents.length; i++){
        Componentss = this._addComponent(Componentss, arrayedComponents[i]) // arrayedComponents[i] //
    }
    return (
        <View
        style = {{
            flexDirection: 'row'
        }}
        >
        {Componentss}
        </View>
    );
   }

   _makeViewWithBGColor_pixel = (colorHex, pixel) => {
    return(<View
    style = {{
        backgroundColor : `#${colorHex}`,
        width: 1,
        height: '100%' //this.suitableViewHeight
    }}
    ></View>);
   }

   _TMP_rturn = (content) => {
       return(
           <Text>asdf</Text>
       );
   }
   
    
   // all color from black to red

   _makeAllColorWithHex = () => {
    for (let i = 0; i <= 255; i++){
        // get Hex color code with RGB
        let hexedColor;
        if(this.props.lineColor === "r" && (this.green === false && this.blue === false)){
            hexedColor = rgbHex(i, 0, 0);
        }else if(this.props.lineColor === "g" || this.green === true){
            hexedColor = rgbHex(0, i, 0);
        }else if(this.props.lineColor === "b" || this.blue === true){
            hexedColor = rgbHex(0, 0, i);
        }
        // get View component styled with back ground color
        let viewComponentWithStyled = this._makeViewWithBGColor_pixel(hexedColor)        
        // push the items to array
        allHexedColors.push(viewComponentWithStyled)

    }


    
   }

   // incrase the Components up to bigger then its

   _increaseCompUp2Bigger = (biggerNumber, arrayedComponents) => {
       // if smaller the number of the bigger array then comp array, bigger number will be increase the def 320px
       if (biggerNumber < 320){
           biggerNumber = mininumWindowWidth
       }

       const arrayItemNumber = arrayedComponents.length

    for (let i = 0; i < biggerNumber; i++){
        let k = (i+1)/biggerNumber
        
        // corresponding item index number will be ceiled
        const corresArrayItemNumber = Math.ceil( arrayItemNumber*k)
        // convert array index number
        let realCorresArrayItemNumber = corresArrayItemNumber-1;
        // refuge to up zero
        if (realCorresArrayItemNumber < 0){ realCorresArrayItemNumber=0 }
        // get corresponding item for bigger numbered array
        const corresItem4allDimensedviews = arrayedComponents[realCorresArrayItemNumber]
        // push the new item into the allDimensedviews array
        allDimensedviews.push(corresItem4allDimensedviews)
    }

   }

   // just one time loaded function before the render() function

   componentWillMount(){
       if (this.state.getFunctionMode === true) { return null; }
   this._makeAllColorWithHex()
   this._increaseCompUp2Bigger(windowWidth, allHexedColors)
   //allHexedColors.length = 250
    
   }

   _renderFx = () => {
    return (
        <View
        style={{
            width: '100%',
            height: '100%',
           // backgroundColor: '#FFEB38',
            flexDirection: 'row'

        }}
>
{this._joinComponents(allDimensedviews)}
   
</View>
    );
   }
    
    render() {
        
    return    this._renderFx();
    }
}

const new_BgEdView = new BgEdView("getFunctionMode");

BgEdView.justOnePx = (windowWidth, order) => {

    let emptyFront_s = [];
    for (let i = 1; i < order; i++){
        emptyFront_s.push(new_BgEdView._render(<View
        style = {{
            width: 1,
            height: '100%',
            backgroundColor: '#FFFF'
        }}
        ></View>)
           )
    }

    // calculate order matching on the 256
    const k = order/windowWidth
    const corres256 = Math.ceil(256*k)
    let realCorres256 = corres256-1
    if ( realCorres256 < 0) { realCorres256 = 0}
    // get hex 
    let hexedCorres256;
    if(this.props.lineColor === "r" && (this.green === false && this.blue === false)){
        hexedCorres256 = rgbHex(realCorres256, 0, 0)
    }else if(this.props.lineColor === "g" || this.green === true){
        hexedCorres256 = rgbHex(0, realCorres256, 0)
    }else if(this.props.lineColor === "b" || this.blue === true){
        hexedCorres256 = rgbHex(0, 0, realCorres256)
    }

    

    if (order > 0){
        emptyFront_s.push(new_BgEdView._render(<View
            style = {{
                width: 1,
                height: '100%',
                backgroundColor: `#${hexedCorres256}`
            }}
            ></View>))
    }

    return {rendered: new_BgEdView._joinComponents(emptyFront_s), color: hexedCorres256};
    

   }


   BgEdView.afterRender = (bottomHeight) => {

    
    
    return new_BgEdView._afterRender(bottomHeight)
    

   }

   
   const red = new BgEdView("red")
   







