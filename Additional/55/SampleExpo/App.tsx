import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Input, Button, ListItem } from 'react-native-elements';

const App = () => {
  const [seq, setSeq] = useState(1);
  const [human, setHuman] = useState({name: "", age: ""});
  const [items, setItems] = useState([{id: -1, name: "", age: ""}]);

  const entryItem = (inputName: string, inputAge: string) => {
    if (inputName === "" || inputAge === "") {
      alert("名前と年齢を入力してください。");
      return;
    }
    setItems(items =>[...items, {id: seq, name: inputName, age: inputAge }]);
    setSeq(seq+1);
    setHuman({name:"", age:""});
  }

  const deleteItem = (id: number) => {
    const newItems = items.filter(item => item.id != id);
    setItems(newItems);
  }

  return (
    // <ScrollView>
    <View style={styles.container}>
      <Card>
        <Card.Title>名前と年齢を入力</Card.Title>
        <Input value={human.name} label="名前" placeholder="リアクト太郎"
            onChangeText={(value)=>{setHuman({...human, name: value})}} />
        <Input keyboardType={'numeric'} value={human.age} label="年齢" placeholder="0"
            onChangeText={(value)=>{setHuman({...human, age: value})}} />
        <Button
          title="Entry"
          type="solid"
          onPress={()=>entryItem(human.name, human.age)}
        />
      </Card>
      {
        items.filter(item => item.id != -1).map((item, i) => (
          <ListItem.Swipeable key={i} bottomDivider
          rightContent={
            <Button
              title="Delete"
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              onPress={() => deleteItem(item.id)}
            />
          }
          >
            <ListItem.Content>
              <ListItem.Title>{i+1} : {item.name}({item.age})</ListItem.Title>
              {/* <View>
                <ListItem.Subtitle>{item.age}</ListItem.Subtitle>
              </View> */}
            </ListItem.Content>
          </ListItem.Swipeable>
        ))
      }
    </View>
    // </ScrollView>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:80
  },
});
