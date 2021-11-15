import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Null extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      title: '',
      note: '',

      editId: null,
      editNote: '',
      editTitle: '',
    };
  }

  getTodo = () => {
    const url = `https://api-todoapp-pp.herokuapp.com/api/todo`;
    console.log(this.state.token);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(respon => respon.json())
      .then(resjson => {
        console.log(resjson);
        this.setState({data: resjson.data});
      })
      .catch(error => {
        console.log('errornya adalah : ' + error);
        this.setState({loading: false});
      });
  };

  addTodo() {
    const {title, note, token} = this.state;
    if (title !== '' && note !== '') {
      const todo = {
        title: title,
        note: note,
      };
      fetch('https://api-todoapp-pp.herokuapp.com/api/todo', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          Authorization: `bearer ${this.state.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response) console.log('upload succes', response);
          alert('Data ditambahkan!');
          this.getTodo();
        })
        .catch(error => {
          console.log('upload error', error);
          alert('Gagal ditambahkan');
        });
    } else {
      alert('Isi dengan benar');
    }
  }

  deleteTodo(id) {
    fetch(`https://api-todoapp-pp.herokuapp.com/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        const {status} = json;
        if (status == 'succes') {
          this.getTodo();
        } else {
          alert('Gagal menghapus');
        }
      });
  }

  editTodo() {
    const {editTitle, editNote, editId} = this.state;
    if (editTitle !== '' && editNote !== '') {
      const todo = {
        _method: 'PUT',
        title: editTitle,
        note: editNote,
      };
      fetch(`https://api-todoapp-pp.herokuapp.com/api/todo/${editId}`, {
        method: 'POST',
        body: this.JSON.stringify(todo),
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.status == 'succes') {
            console.log('upload succes', response);
            alert('Data dirubah!');
            this.getTodo();
          } else {
            alert('Error');
          }
        })
        .catch(error => {
          console.log('Gagal ditambahkan');
        });
    } else {
      alert('Isi dengan benar');
    }
  }

  logOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      if (token !== null) {
        this.setState({token: token});
        this.getTodo();
      } else {
        console.log('gak ada token');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewTopU}>
          <View style={styles.viewLogin}>
            <ScrollView>
              <View style={styles.headerBg}>
                <TouchableOpacity
                  onPress={() => this.logOut()}
                  style={styles.view13}>
                  <Text style={styles.text12}>Sign Out</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.categoryText}>Daftar Todolist</Text>

              <View style={styles.listContainer}>
                <View style={{width: '70%'}}>
                  <Text style={styles.listText}>title</Text>

                  <Text style={styles.qtyText}>Qty: note</Text>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Title"
                  underlineColorAndroid="transparent"
                  onChangeText={title => this.setState({title: title})}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Note"
                  underlineColorAndroid="transparent"
                  onChangeText={note => this.setState({note: note})}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, styles.marginSmallV]}
                onPress={() => this.addTodo()}>
                {this.state.addLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Add Todo</Text>
                )}
              </TouchableOpacity>
              {/* ------------------------------------------------------- */}
              {this.state.data.map((v, k) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.deleteTodo(v.id)}
                    key={k}
                    style={styles.listContainer}>
                    <View style={{width: '70%'}}>
                      <Text style={styles.listText}>{v.title}</Text>

                      <Text style={styles.qtyText}>Note: {v.note}</Text>
                      <Text style={styles.qtyText}>Note: {v.created_at}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              {/* ---------------------------------------------------------------- */}
            </ScrollView>
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('TambahInventory')}
              style={styles.rmb}>
              <View style={styles.vpm}>
                <Icon name="add" size={30} />
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={styles.bottomContainer}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view13: {
    backgroundColor: 'dodgerblue',
    height: 35,
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 10,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    borderRadius: 10,
    height: 48,
    backgroundColor: '#e0265d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginSmallV: {
    marginVertical: 4,
  },
  // --------------------------------------
  rmb: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'center',
  },
  vpm: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee4e49',
    elevation: 5,
    marginBottom: 5,
  },
  headerBg: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    backgroundColor: '#158ac5',
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'center',
  },
  headerDash: {
    marginTop: 11,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
    marginTop: 10,
    flex: 1,
    marginVertical : 20
  },
  listText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  bottomText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  qtyText: {
    fontSize: 13,
    marginLeft: '10%',
  },
  totalText: {
    fontSize: 13,
    marginLeft: '10%',
  },
  hargaText: {
    textAlign: 'right',
    flex: 1,
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
  },
  chckText: {
    marginTop: -9,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '35%',
  },
  textBarang: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  headerView: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  viewLogin: {
    width: '95%',
    height: '90%',
    backgroundColor: '#f0f1f5',
    elevation: 10,
    borderRadius: 10,
  },
  categoryContainer: {
    width: '30%',
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
  },
  textContainer: {
    width: '33%',
    height: 90,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
  },
  listContainer: {
    width: '94%',
    backgroundColor: '#bbe1fd',
    paddingVertical: '5%',
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical : 15
  },
  bottomContainer: {
    width: '94%',
    height: 54,
    backgroundColor: '#bbe1fd',
    paddingTop: '5%',
    marginLeft: 10,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barangContainer: {
    width: '90%',
    height: 120,
    backgroundColor: '#cccccc',
    paddingTop: '5%',
    margin: 10,
    borderRadius: 10,
  },
  viewBarang: {
    flexDirection: 'row',
  },
  category: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    paddingLeft: 10,
  },
  viewTopU: {
    alignItems: 'center',
    flex: 1,
    paddingTop: '2.5%',
  },

  headerIcon: {
    width: 35,
    height: 35,
  },
  headerIconRight: {
    width: 35,
    height: 35,
    marginLeft: '40%',
    tintColor: '#3c48ae',
  },
  dashIcon: {
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginRight: '3%',
  },
  categoryIcon: {
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginLeft: '10%',
    paddingBottom: '10%',
  },
  listIcon: {
    tintColor: '#3c48ae',
    width: 35,
    height: 35,
    marginLeft: '10%',
    paddingBottom: '10%',
  },
  barangIcon: {
    tintColor: 'white',
    width: 60,
    height: 60,
    marginLeft: '10%',
    paddingBottom: '10%',
  },
});
