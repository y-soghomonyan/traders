import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();
    const contact_page = t('contact_page', { returnObjects: true });
    // console.log(contact_page);
    return (
        <div className="container">
            <div className="row justify-content-center mt-3">
                <div className="col-md-8">
                    <h2>{contact_page.page_title}</h2>
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                {/* <h2 className='text-center'>{contact_page.title}</h2> */}
            </div>
            <div className="row justify-content-center mt-3">

                <div id="map" >
                </div>
              
            </div>
        </div>
    );
}
export default Contact;