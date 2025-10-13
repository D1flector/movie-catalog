import Lottie from 'lottie-react';
import NotFound from '../assets/NotFound.json'
import { Link } from 'react-router-dom'; 
import '../styles/NotFoundPage.scss';

const LOTTIE_STYLES: React.CSSProperties = {
    width: 400, 
    height: 400,
    maxWidth: '90vw'
};

const NotFoundPage = () => {
    
    return (
        <div className="not-found-page">
            
            <div className="not-found-page__animation-container">
                <Lottie 
                    animationData={NotFound} 
                    style={LOTTIE_STYLES}
                    loop={true}
                    autoplay={true}
                />
            </div>
            
            <h2 className="not-found-page__title">Упс! Страница не найдена</h2>
            <p className="not-found-page__text">
                Похоже, вы свернули не туда. Вернитесь, чтобы найти нужную вам информацию.
            </p>
            
            <Link to="/" className="not-found-page__link">
                На главную страницу
            </Link>
        </div>
    );
};

export default NotFoundPage;