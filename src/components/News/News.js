import React from 'react';

function News({ news }) {
    const firstArticles = news.slice(0, 10);

    return (
        <div>
            <h3>The Coronavirus Pandemic: Latest Updates</h3>
            <div className="articles-container">
                <div className="articles-image"></div>
                <div className="article">
                    {firstArticles.map(n =>
                        <div key={n.id}>
                            <h5 className='article-title'>{n.title}</h5>
                            <div className="article-flex-container">
                                <p className='article-paragraph'>Source: {n.source}</p>
                                <a className='article-link' href={n.url} alt="Newsfeed" rel="noreferrer" target="_blank">Read More</a>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default News;