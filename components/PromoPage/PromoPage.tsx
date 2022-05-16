import React from 'react';

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
                            Click On App — это сервис для эффективного изучения английского
                        </h3>
                        <p>
                            Здесь вы легко и быстро прокачаете грамматику, запоминание слов,
                            понимание на слух и другие ключевые навыки владения языком
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
                <h3 className={style['aims-title']}>Английский для ваших целей</h3>
                <ul className={style['aims-list']}>
                    <li>
                        <div>
                            <img src={travel} alt="" />
                            <span>Путешествовать</span>
                        </div>
                        <div>
                            <img src={job} alt="" />
                            <span>Работать</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={study} alt="" />
                            <span>Учиться</span>
                        </div>
                        <div>
                            <img src={book} alt="" />
                            <span>Смотреть фильмы и читать книги</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={idea} alt="" />
                            <span> Развиваться</span>
                        </div>
                        <div>
                            <img src={country} alt="" />
                            <span>Переехать в другую cтрану</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section className={style['video-section']}>
            <div className={style['description-container']}>
                <h3>Весь английский на одном сайте</h3>
                <p>
                    Click On App — это интерактивная версия популярного учебника по английскому языку Click On.
                    Здесь собрана коллекция упражнений для любого уровня владения английским.
                    Сфокусируйтесь на том, что важно именно вам, и добейтесь результатов.
                </p>
            </div>
            <div className={style['video-container']}>
                <img src={click_on}
                     alt="click-on image"
                     height="285"/>
            </div>
        </section>

        <section className={style['advantages-section']}>
            <div className={style['advantage-wrapper']}>
                <h3>Преимущества Click On App</h3>
                <ul className={style['advantage-list']}>
                    <li>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>
                                Учебник всегда под рукой
                            </span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>
                                Автоматическая проверка заданий
                            </span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>
                                Дополнительный модуль по информационным технологиям
                            </span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>
                                Словарь с изучаемыми словами
                            </span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>
                                Страница с изучаемыми правилами
                            </span>
                        </div>
                        <div>
                            <img src={checked} alt="checked" />
                            <span>
                                Красочное оформление
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section className={style['method-description']}>
            <div className={style['method-description_wrapper']}>
                <div className={style['description-article']}>
                    <h3>
                        Процесс обучения в Click On App
                    </h3>
                    <ul>
                        <li>Изучайте правила и выполняйте задания на них в <b>Student's Book</b></li>
                        <li>Отрабатывайте полученные знания в <b>Workbook</b></li>
                        <li>После каждого второго раздела закрепляйте пройденный материал в <b>Tests</b></li>
                    </ul>
                    <p>
                        Упражняйтесь как можно чаще, и всегда прилагайте максимум усилий,
                        чтобы достичь наилучших результатов!
                    </p>
                </div>
            </div>
        </section>

        <section className={style['products-section']}>
            <div className={style['products-title']}>
                <h3>Начните изучать английский прямо сейчас!</h3>
            </div>
            <ul className={style['products-list']}>
                <li>
                    <NavLink href={userName ? '/tasks' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img src={tasks} alt="" />
                            </div>
                            <div>
                                <h3>Упражнения</h3>
                                <span>Отрабатывай пройденный материал</span>
                            </div>
                        </a>
                    </NavLink>
                    <NavLink href={userName ? '/profile' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img src={lp} alt="" />
                            </div>
                            <div>
                                <h3>Личный кабинет</h3>
                                <span>Смотри свой прогресс и достижения</span>
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
                                <h3>Правила</h3>
                                <span>Повторение изученных правил</span>
                            </div>
                        </a>
                    </NavLink>
                    <NavLink href={userName ? '/dictionary' : '/login'}>
                        <a className={style['product-nav']}>
                            <div className={style['product-image']}>
                                <img src={dictionary} alt="" />
                            </div>
                            <div>
                                <h3>Словарь</h3>
                                <span>Повторение изученных слов</span>
                            </div>
                        </a>
                    </NavLink>
                </li>
            </ul>
        </section>
    </div>
);

export default PromoPage;
