import React from "react";
import Buttons from "./Components/Buttons";
import Items from "./Components/Items";
import Preview from "./Components/Preview";
import Saldo from "./Components/Saldo";

import axios from "axios";

class Winkel extends React.Component {

    state = {
        allItems: [],
        kastkleuren: [],
        robotkleuren: [],
        kastdecoraties: [],
        soort: "kastkleur",
        item: {},
        behaaldeItems: [],
        user: {},
        boekenkast: {},
    }

    componentDidMount = () => {
        const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/winkel/";
        axios.get(BASE_URL + this.props.user_id).then(res => {
            let behaalde_items = res.data.behaalde_items.filter(obj => obj.user_id == this.props.user_id);
            this.setState({allItems: res.data.items,
                            kastkleuren: res.data.kastkleuren,
                            robotkleuren: res.data.robotkleuren,
                            kastdecoraties: res.data.kastdecoraties,
                            behaaldeItems: behaalde_items,
                            user: res.data.user,
                            boekenkast: res.data.boekenkast});
        })
    };

    refreshWinkel = () => {
        const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/winkel/";
      axios.get(BASE_URL + this.props.user_id).then(res => {
          let behaalde_items = res.data.behaalde_items.filter(obj => obj.user_id == this.props.user_id);
          this.setState({allItems: res.data.items,
                          kastkleuren: res.data.kastkleuren,
                          robotkleuren: res.data.robotkleuren,
                          kastdecoraties: res.data.kastdecoraties,
                          behaaldeItems: behaalde_items,
                          user: res.data.user,
                          boekenkast: res.data.boekenkast});
      })
    }

    updateColor = (item_id, user_id) => {
        const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/winkel/update/color/";
        axios.put(BASE_URL + user_id, {"item_id": item_id, _method: 'patch'})
            .then(res => {
        });
        setTimeout(this.refreshWinkel, 500);

    }

    koopItem = (item_id, user_id, item_prijs) => {
        const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/winkel/koop/item/";
        axios.post(BASE_URL + user_id, {"item_id": item_id, "item_prijs": item_prijs})
            .then(res => {
        });
        setTimeout(this.refreshWinkel, 500);
    }

    onButtonClicked = (soort) => {
        this.setState({soort: soort,
                        item: {}});
    }

    onItemClick = (item) => {
        this.setState({item: item});
    }

    render () {

        return (
            <article className = "winkelSection">
                <Saldo saldo = {this.state.user.saldo} />
                <Preview item = {this.state.item} soort = {this.state.soort} boekenkast = {this.state.boekenkast} behaaldeItems = {this.state.behaaldeItems} koopItem = {this.koopItem} updateColor = {this.updateColor} user_id = {this.state.user.id} user = {this.state.user} />
                <Buttons onButtonClicked = {this.onButtonClicked}/>
                <Items boekenkast = {this.state.boekenkast} behaaldeItems = {this.state.behaaldeItems} soort = {this.state.soort} items = {this.state} allItems = {this.state.allItems} onItemClick = {this.onItemClick} />
            </article>
        )
    }
}

export default Winkel;
