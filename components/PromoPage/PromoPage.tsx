import parse from 'html-react-parser';
import React from 'react';

import textForApp from '../../constants/translate';
import NavLink from '../NavLink/NavLink';
import englishman from './images/anglichanin.png';
import book from './images/book.png';
import travel from './images/case.png';
import checked from './images/checked.png';
import click_on from './images/click_on.png';
import country from './images/country.png';
import dog from './images/dog.png';
import idea from './images/idea.png';
import job from './images/job.png';
import lp from './images/lp.png';
import study from './images/stydied.png';
import tasks from './images/tasks.png';
import dictionary from './images/words.png';
import style from './PromoPage.module.scss';

const PromoPage = ({ lang, userName }) => (
    <div className={style['promo-section']}>
        <section className={style['introduction-section']}>
            <div className={style['introduction-wrapper']}>
                <div className={style['boolets-section']}>
                    <img src={englishman} alt="man" />
                </div>
                <div className={style['greeting-section']}>
                    <div className={style['greeting-wrapper']}>
                        <h3>
                            {textForApp[lang].promo.description[0]}
                        </h3>
                        <p>
                            {textForApp[lang].promo.description[1]}
                        </p>
                    </div>
                </div>
            </div>
            <div className={style['dog-section']}>
                <div>
                    <img src={dog} alt="dog" />
                </div>
            </div>
        </section>

        <section className={style['aims-container']}>
            <div className={style['aims-section']}>
                <h3 className={style['aims-title']}>{textForApp[lang].promo.description[2]}</h3>
                <ul className={style['aims-list']}>
                    <li>
                        <div>
                            <img src={travel} alt="" />
                            <span>{textForApp[lang].promo.aims[0]}</span>
                        </div>
                        <div>
                            <img src={job} alt="" />
                            <span>{textForApp[lang].promo.aims[1]}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={study} alt="" />
                            <span>{textForApp[lang].promo.aims[2]}</span>
                        </div>
                        <div>
                            <img src={book} alt="" />
                            <span>{textForApp[lang].promo.aims[3]}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={idea} alt="" />
                            <span> {textForApp[lang].promo.aims[4]}</span>
                        </div>
                        <div>
                            <img src={country} alt="" />
                            <span>{textForApp[lang].promo.aims[5]}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section className={style['video-section']}>
            <div className={style['description-container']}>
                <h3>{textForApp[lang].promo.description[3]}</h3>
                <p>{textForApp[lang].promo.description[4]}</p>
            </div>
            <div className={style['video-container']}>
                <img src={click_on}
                     alt="click-on image"
                     height="285"/>
            </div>
        </section>

        <section className={style['advantages-section']}>
            <div className={style['advantage-wrapper']}>
                <h3>{textForApp[lang].promo.description[5]}</h3>
                <ul className={style['advantage-list']}>
                    <li>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>{textForApp[lang].promo.benefits[0]}</span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>{textForApp[lang].promo.benefits[1]}</span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>{textForApp[lang].promo.benefits[2]}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>{textForApp[lang].promo.benefits[3]}</span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>{textForApp[lang].promo.benefits[4]}</span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>{textForApp[lang].promo.benefits[5]}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section className={style['method-description']}>
            <div className={style['method-description_wrapper']}>
                <div className={style['description-article']}>
                    <h3>{textForApp[lang].promo.description[6]}</h3>
                    <ul>
                        <li>{parse(textForApp[lang].promo.process[0])}</li>
                        <li>{parse(textForApp[lang].promo.process[1])}</li>
                        <li>{parse(textForApp[lang].promo.process[2])}</li>
                    </ul>
                    <p>{textForApp[lang].promo.process[3]}</p>
                </div>
            </div>
        </section>

        <section className={style['products-section']}>
            <div className={style['products-title']}>
                <h3>{textForApp[lang].promo.description[7]}</h3>
            </div>
            <ul className={style['products-list']}>
                <li>
                    <NavLink href={userName ? '/tasks' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img src={tasks} alt="" />
                            </div>
                            <div>
                                <h3>{textForApp[lang].links[3]}</h3>
                                <span>{textForApp[lang].promo.links[0]}</span>
                            </div>
                        </a>
                    </NavLink>
                    <NavLink href={userName ? '/profile' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img src={lp} alt="" />
                            </div>
                            <div>
                                <h3>{textForApp[lang].links[7]}</h3>
                                <span>{textForApp[lang].promo.links[1]}</span>
                            </div>
                        </a>
                    </NavLink>
                </li>
                <li>
                    <NavLink href={userName ? '/rules' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img className={style.book} src={book} alt="" />
                            </div>
                            <div>
                                <h3>{textForApp[lang].links[5]}</h3>
                                <span>{textForApp[lang].promo.links[2]}</span>
                            </div>
                        </a>
                    </NavLink>
                    <NavLink href={userName ? '/dictionary' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img src={dictionary} alt="" />
                            </div>
                            <div>
                                <h3>{textForApp[lang].links[4]}</h3>
                                <span>{textForApp[lang].promo.links[3]}</span>
                            </div>
                        </a>
                    </NavLink>
                </li>
            </ul>
        </section>
    </div>
);

export default PromoPage;
