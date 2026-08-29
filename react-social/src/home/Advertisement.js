import React from "react";
import Footer from "./Footer";
import { getAdvertisement } from "../util/APIUtils";

class Advertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAdvertisment: [],
            keyword: ''
        }

        this.loadAdvertisement = this.loadAdvertisement.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);   
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue,
        });      
    }

    loadAdvertisement() {
        getAdvertisement(1, 100,this.state.keyword)
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

    componentDidUpdate(){
        this.loadAdvertisement()
    }

    componentDidMount() {
        this.loadAdvertisement();

    }
    render() {
        let list = this.state.listAdvertisment;
        console.log("ADS", list)
        return (
            <main>
                <div class="slider-area ">
                    <div class="single-slider section-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>Quảng Cáo</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="blog_area section-padding">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mb-5 mb-lg-0">
                                <div class="blog_left_sidebar">
                                    {list.map(adv => {
                                        return (
                                            <article class="blog_item">
                                                <div class="blog_item_img">
                                                    <img  src={`http://localhost:8080/image/`+adv.image.replace('photographer/files/','')}  height={"400px"} width={"600px"} alt="" />
                                                    <a href="#" class="blog_item_date">
                                                        <h3>10</h3>
                                                        <p>New</p>
                                                    </a>
                                                </div>

                                                <div class="blog_details">
                                                    <a class="d-inline-block" href="single-blog.html">
                                                        <h2>{adv.title}</h2>
                                                    </a>
                                                    <p>{adv.description}</p>
                                                </div>
                                            </article>
                                        )
                                    })}
                                    {/* <nav class="blog-pagination justify-content-center d-flex">
                                        <ul class="pagination">
                                            <li class="page-item">
                                                <a href="#" class="page-link" aria-label="Previous">
                                                    <i class="ti-angle-left"></i>
                                                </a>
                                            </li>
                                            <li class="page-item">
                                                <a href="#" class="page-link">1</a>
                                            </li>
                                            <li class="page-item active">
                                                <a href="#" class="page-link">2</a>
                                            </li>
                                            <li class="page-item">
                                                <a href="#" class="page-link" aria-label="Next">
                                                    <i class="ti-angle-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav> */}
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="blog_right_sidebar">
                                    <aside class="single_sidebar_widget search_widget">
                                        <form action="#">
                                            <div class="form-group">
                                                <div class="input-group mb-3">
                                                    <input type="text" class="form-control" placeholder='Search Keyword' 
                                                    name='keyword' value={this.state.keyword} onChange={this.handleInputChange}
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = 'Search Keyword'" />
                                                    <div class="input-group-append">
                                                        <button class="btns" type="button"><i class="ti-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        )
    }
}

export default Advertisement;