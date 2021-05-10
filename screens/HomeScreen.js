import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import {Header} from 'react-native-elements';



export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            text:''
        }
    }

    getWord=(word)=>{
      var searchKeyword=word.toLowerCase()
      var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
      //console.log(url)
      .then((data)=>{
        if(data.status===200){
          return data,json()
        }
        else{
          return null
        }
      })
      .then((response)=>{
        //console.log(response)
        var responseObject=response
        //var word=responseObject.word
        //var lexicalCategory=responseObject.results[0].lexicalEntries[0].lexicalCategory.text
        if(responseObject){
          var wordData=responseObject.definition[0]
          //console.log(responseObject.definitions[0])
          var definition=wordData.description
          var lexicalCategory=wordData.wordType
          //console.log(lexicalCategory)
          this.set({
            "word":this.state.text,
            "definition":definition,
            "lexicalCategory": lexicalCategory
          })
        }
        else{
          this.setState({
            "word":this.state.text,
            "definition":"not found",
          })
        }
      })
    }

  render() {
    return (
      <View>
      <TextInput
        style={styles.inputBox}
        onChangeText={text => {
          this.setState({
            text:text,
            isSearchPassword:false,
            word:"Loading...",
            lexicalCategory:'',
            examples:[],
            definition:""
          })
        }}
      />

      <TouchableOpacity 
      style={styles.searchButton}
      onPress={()=>{
        this.setState({isSearchPassword:true});
        this.getWord(this.state.text)
      }}>

      </TouchableOpacity>
      
       <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}> Word:{" "}</Text>
          <Text style={{fontSize:18}}>{this.state.word}</Text>
       </View>

       <View style={styles.detailsContainer}>
         <Text>Type:{" "}</Text>
         <Text style={{fontSize:18}}>{this.state.lexicalCategory}</Text>
       </View>

       <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        <Text style={styles.detailsTitle}>Definition:{" "}</Text>  
        <Text style={{fontSize:18}}>{this.state.definition}</Text>
       </View>
       <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPassword && this.state.word === "Loading..."
              ?this.state.word
              :""
            }
          </Text>
          {
            this.state.word !== "Loading..."?
          (
        </View>

        <View style={{justifyContent:'center', marginLeft:10}}>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Word:{""}
              </Text>
              <Text style={{fontSize:18}}>
                {this.state.word}
              </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text styles={styles.detailsTitle}>
                  Type:{""}
                  </Text>
                  <Text style={{fontSize:18}}>
                    {this.state.leaxicalCategory}
                    </Text>
                    </View>
            
       </View>
      </View>   
    );
    
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  inputBoxContainer:{
    flex:0,
    alignnItems:'center',
    justifyContent:'center',
  },
  inputBox:{
    width:'80%',
    alignSelf:'center',
    height:40,
  },
})
