import { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    };

    return (
        <div className="cy-contacts">
            {
                contacts !== null && !loading
                    ? (
                        <TransitionGroup>
                            {filtered !== null
                                ? filtered.map(contact => (
                                    <CSSTransition
                                        key={contact._id}
                                        timeout={500}
                                        classNames='item'
                                    >
                                        <ContactItem contact={contact} />
                                    </CSSTransition>
                                ))
                                : contacts.map(contact => (
                                    <CSSTransition
                                        key={contact._id}
                                        timeout={500}
                                        classNames='item'
                                    >
                                        <ContactItem contact={contact} />
                                    </CSSTransition>
                                ))}
                        </TransitionGroup>
                    )
                    : <Spinner />
            }
        </div>
    );
};

export default Contacts;
