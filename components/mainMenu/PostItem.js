import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, TextInput, Modal, Portal, Text, RadioButton } from 'react-native-paper';

const PostItem = ({post, setPost}) => {

    const handleItemChange = (key, v) => {
        setPost(prev => ({
             ...prev, item: { ...prev.item, [key]: v }
        }));
    }

    const postData = async () => {
        if (post.item.id && post.item.word && post.item.translation && post.item.transcription) {
            try {
                fetch('postItem', {
                method: 'POST',
                body: JSON.stringify({
                    id: post.item.id,
                    level: 0,
                    wordData: {
                        word: post.item.word,
                        translation: post.item.translation,
                        transcription: post.item.transcription
                    },
                    isSentense: post.item.isSentense
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('data from post', data);
                });
            } catch (er) {
                console.error(er);
            }
        }
	};



	return (
		<Portal>
			<Modal
				visible={post.visible}
				onDismiss={() => setPost({ ...post, visible: false })}>
				<View>
					<Text>ID</Text>
					<TextInput value={post.item.id} onChangeText={(v) => handleItemChange('id', v)}/>
				</View>
                <View>
                    <Text>isSentense</Text>
                    <RadioButton.Group onValueChange={(v) => handleItemChange('isSentense', v)} value={post.item.isSentense}>
                        <View>
                            <Text>Yes</Text>
                            <RadioButton value={true} />
                        </View>
                        <View>
                            <Text>No</Text>
                            <RadioButton value={false} />
                        </View>
                    </RadioButton.Group>
                </View>
                <View>
                    <Text>transcription</Text>
					<TextInput value={post.item.transcription} onChangeText={(v) => handleItemChange('transcription', v)}/>
                </View>
                <View>
                    <Text>translation</Text>
					<TextInput value={post.item.translation} onChangeText={(v) => handleItemChange('translation', v)}/>
                </View>
                <View>
                    <Text>word</Text>
					<TextInput value={post.item.word} onChangeText={(v) => handleItemChange('word', v)}/>
                </View>
                <Button
                    style={{backgroundColor: 'yellow'}}
                    onPress={postData}
                    disabled={!post.item.word || !post.item.translation || !post.item.transcription || !post.item.id}
                >
                    Post item
                </Button>
			</Modal>
		</Portal>
	);
};

export default PostItem;
