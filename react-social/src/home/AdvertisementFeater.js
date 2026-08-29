import React from "react";
import { getAdvertisement } from "../util/APIUtils";


class AdvertisementFeater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAdvertisment: [],
        }

        this.loadAdvertisement = this.loadAdvertisement.bind(this);
    }

    loadAdvertisement() {
        getAdvertisement(1, 2,'')
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listAdvertisment: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    componentDidMount() {
        this.loadAdvertisement();

    }
    render() {
        let list = this.state.listAdvertisment;
        console.log("ADS", list)
        return (
            <div class="row">
                {list.map(adv => {
                    return (
                <div class="col-xl-6 col-lg-6 col-md-6">
                    <div class="home-blog-single mb-30">
                        <div class="blog-img-cap">
                            <div class="blog-img">
                                <img src={`http://localhost:8080/image/`+adv.image.replace('photographer/files/','')} height={"596px"} width={"453px"} alt="" />

                                <div class="blog-date text-center">
                                    <span>10</span>
                                    <p>Mới</p>
                                </div>
                            </div>
                            <div class="blog-cap">
                                <p>|  Properties</p>
                                <h3><a href="single-blog.html">{adv.title}</a></h3>
                                <a href="#" class="more-btn">Read more »</a>
                            </div>
                        </div>
                    </div>
                </div>
                    )
                })}
            </div>
        )
    }
}

export default AdvertisementFeater;