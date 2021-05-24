import * as React from "react";
import {Alert, View} from 'react-native';
import {Button, Card, Text} from 'react-native-elements'
import axios from "axios"
import {useDispatch, useSelector, RootStateOrAny} from "react-redux";
import {useRoute, RouteProp} from "@react-navigation/native";
import config from "../../config"
import {userTicketDecrease, Vote} from "../../redux/reducer"


export default () => {
    const user = useSelector((store: RootStateOrAny) => store.userReducer)
    const dispatch = useDispatch()
    let [isLoading, setIsLoading] = React.useState(false)
    let [vote, setVote] = React.useState<Vote>(useRoute<RouteProp<{ vote: Vote }, 'vote'>>().params)

    React.useEffect(() => {
        getVote()
    }, [])

    const getVote = () => {
        axios.get(`/votes/${vote.voteId}`)
            .then(res => setVote(res.data))
            .catch(() => Alert.alert("error"))
    }

    const voteItem = (voteId, itemId) => {
        if (isLoading) return

        if (!user.token) {
            Alert.alert("need login")
            return
        }

        if (user.ticket < 1) {
            Alert.alert("not enough ticket")
            return
        }

        axios.post(`/votes/${voteId}/items/${itemId}`).then(res => {
            setVote(res.data)
            setIsLoading(false)
            dispatch({type: userTicketDecrease, payload: 1})
            Alert.alert("success")
        }).catch(() => Alert.alert("error"))
    }

    return (
        <Card>
            <Card.Title>{vote.subject}</Card.Title>
            <Card.Divider/>
            <Text style={{marginBottom: 10, minHeight: 200}}>{vote.content}</Text>
            <Card.Divider/>
            {
                vote.voteItems?.map((item) => {
                    return (
                        <View
                            key={item.itemId}
                            style={{
                                alignItems: 'center',
                                height: 30,
                                marginBottom: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <Text>{item.subject}</Text>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{marginRight: 10}}>{item.count}</Text>
                                <Button icon={config.icon("Add", "black", 10)}
                                        type="outline"
                                        onPress={() => voteItem(vote.voteId, item.itemId)}
                                />
                            </View>
                        </View>
                    )
                })
            }
        </Card>
    )
}
