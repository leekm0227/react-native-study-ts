import * as React from "react";
import {Button, Card, Input, Text} from 'react-native-elements'
import {Alert, ScrollView, View} from "react-native";
import axios from "axios";
import config from "../../config"
import {useNavigation} from "@react-navigation/native";


export default () => {
    const navigation = useNavigation();
    let [vote, setVote] = React.useState({subject: "", content: ""})
    let [voteItems, setVoteItems] = React.useState([])
    let [item, setItem] = React.useState("")

    const addItem = () => {
        if (item.trim().length === 0) {
            Alert.alert("empty item text");
            return
        }

        setVoteItems(state => [...state, {subject: item}])
        setItem("")
    }

    const removeItem = (index) => {
        setVoteItems(state => state.filter((item, i) => i !== index))
    }

    const confirm = () => {
        if (vote.subject.trim().length === 0) {
            Alert.alert("empty subject")
            return
        }

        if (vote.content.trim().length === 0) {
            Alert.alert("empty content")
            return
        }

        if (voteItems.length < 2) {
            Alert.alert("plz add item")
            return
        }

        Alert.alert(
            "submit",
            "submit?",
            [{text: "Cancel"}, {text: "Ok", onPress: submit}]
        )
    }

    const submit = () => {
        axios.post('/votes', {...vote, voteItems: voteItems}).then(res => {
            Alert.alert("success")
            navigation.goBack()
        }).catch(() => Alert.alert("error"))
    }


    return (
        <ScrollView>
            <Card>
                <Input label="SUBJECT" onChangeText={(text) => {
                    setVote({...vote, subject: text})
                }}/>
                <Card.Divider/>
                <Input style={{minHeight: 50}}
                       label="CONTENT"
                       multiline={true}
                       numberOfLines={2}
                       onChangeText={(text) => setVote({...vote, content: text})}
                />
                <Card.Divider/>
                <Input label="ADD ITEM"
                       value={item}
                       onChangeText={(text) => setItem(text)}
                />
                <Button
                    style={{marginBottom: 20}}
                    icon={config.icon("Add", "white")}
                    type="solid"
                    onPress={addItem}
                />
                <Card.Divider/>
                {
                    voteItems?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    height: 30,
                                    marginBottom: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                <Text>{item.subject}</Text>
                                <Button
                                    icon={config.icon("Remove", "black", 10)}
                                    type="outline"
                                    onPress={() => removeItem(index)}
                                />
                            </View>
                        )
                    })
                }
                <Card.Divider/>
                <Button title="SUBMIT" onPress={confirm}/>
            </Card>
        </ScrollView>
    )
}
