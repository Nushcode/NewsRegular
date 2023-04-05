import React, { Component } from "react";
import NewsIteam from "./NewsIteam";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';


export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    catagory: "general",
  };
  static propTypes = {};
  articles = [
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "https://timesofindia.indiatimes.com/sports/cricket/news/pakistans-umar-akmal-banned-for-three-years-pcb/articleshow/75408125.cms",
      urlToImage:
        "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/02/20/Pictures/_ddea9c84-53a4-11ea-b246-02cea10d1852.JPG",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "https://www.telegraph.co.uk/cricket/2022/11/12/what-england-can-learn-1992-world-cup-final/",
      urlToImage:
        "https://images.indianexpress.com/2020/11/Untitled-design-2020-11-25T093630.716.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      progress:0
    };
  }
  
  async componentDidMount() {
    // when react first renders then it called componentDidMount()
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=8e08b3dce263482fb9a64eef2cb80305&page=1&${this.props.pageSize}=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    if (this.state.page - 1 > Math.ceil(this.state.totalResults / 20)) {
    }
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.catagory
    }&apiKey=8e08b3dce263482fb9a64eef2cb80305&page${
      this.state.page - 1
    }&pagesize=18`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false });
    console.log("Previous");
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };
  handleNextCLick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.catagory
    }&apiKey=8e08b3dce263482fb9a64eef2cb80305&page${
      this.state.page + 1
    }&pagesize=18`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false });
    console.log("Next");
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };
   fetchMoreData = async () => {   
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.catagory}&apiKey=8e08b3dce263482fb9a64eef2cb80305&page=1&${this.props.pageSize}=18`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      progress:this.state.progress(100),
      loading: false
    });
  };
  setProgress(){
    this.setState({progress:this.state.progress})
  }
  render() {
    let link =
      "https://play-lh.googleusercontent.com/LMulHEBd3m1bAZmO-yoZTuXA8abvwVtQd_QVPtmnuko3Setwnq90umSjjtOCXywNGvY";
    return (
      <div className="container my-3">
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <h2 className="text-center" style={{ margin: "30px 0px", marginTop:"90px"  }}>
          News Regular - Top Headlines
        </h2>
        {/* {this.state.loading?<Spinner/>:""} */}
        <InfiniteScroll
          dataLength={this.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this. state.totalResults}
          loader={<Spinner/>}
        >
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4">
                <NewsIteam
                  key={element.url}
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 40) : ""
                  }
                  newsUrl={element.url}
                  imageUrl={element.urlToImage ? element.urlToImage : link}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.id ? element.source.id : "Unknown"}
                />
              </div>
            );
          })}
        </div>
       </InfiniteScroll>
      </div>
    );
  }
}
