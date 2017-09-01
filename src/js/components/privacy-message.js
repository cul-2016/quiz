import React from 'react';

const PrivacyMessageComponent = () => {
    return (
        <div className="privacy">
            <h1 className="f-headline"><img src="/assets/logo/Login_signup_icon.svg"></img></h1>
            <div className="content__body">
                  <div className="form">
                      <h2 className="title">What data do we collect, and how do we use it?</h2>
                      <br />
                      <div className="subtitle">
                          When you sign up, you enter your email address, a nickname, and a password. We also record your
                          participation in quizzes, the answers you give, the medals and trophies you receive, and your overall
                          scores. Your email address is probably the most sensitive thing we record, as it’s the only thing that
                          uniquely identifies you. We use your email address for several things:
                      </div>
                      <br />
                      <ul>
                          <li>
                              We use it for allowing you to reset your password if you forget it – we will send an email
                              with a link to reset it.
                          </li>
                          <li>
                              We use it for login and user identification – you enter your email address and password to
                              log in. This means your quiz scores and participation are associated with your email address.
                          </li>
                          <li>
                              We may very rarely send an email with important information about changes to or
                              developments with Quodl.
                          </li>
                          <li>
                              We may use your email address to contact you directly if we notice any issues with your
                              account.
                          </li>
                          <li>
                              For students, your lecturer or person setting the quiz will be able to see your email address
                              and associated quiz scores. Lecturers will be able to use your email address according to
                              their intuition’s rules and policies. Most frequently this would be to award prizes or other
                              recognition for top scorers, or to check the situation if you miss several quizzes or don’t
                              score well across many of them. Other students will only be able to see your nickname – for
                              example on the leaderboard – they will not be able to identify you unless you choose a
                              nickname that makes it obvious who you are.
                          </li>
                          <li>
                              For students, your data may be shared with your institution, and you email address may be
                              used by your institution to cross-tabulate Quodl data with data about you held by your
                              university, such as module enrolment, assessment scores and data from your virtual learning
                              environment like moodle. This could be done for several reasons, including: (1) to allow
                              integration with virtual learning environments like moodle, (2) to get a better picture of how
                              individual students are engaging with their course, (3) to try to identify across students
                              strategies that lead to successful outcomes. In all cases, the primary aim would be to
                              improve your learning experience and outcomes, and those of students who follow you.
                          </li>
                          <li>
                              For lecturers, we also use you email address for verification; by sending an email to the
                              address you give us to confirm that the email address is yours.
                          </li>
                      </ul>
                      <br />
                      <h2 className="title">How long is the data held for? Can I delete it?</h2>
                      <br />
                      <div className="subtitle">
                          We hold your data for the time you have an account with us. If you no longer want an account with
                          us and want to have any identifiable data deleted, we can sort that: email hello@quodl.co.uk.
                      </div>
                      <br />
                      <h2 className="title">Where is the data held?</h2>
                      <br />
                      <div className="subtitle">
                          The data you submit is held within the EU.
                      </div>
                      <br />
                      <h2 className="title">Can I have a copy of my data?</h2>
                      <br />
                      <div className="subtitle">
                          Yes. You can see virtually all the data we hold when you are logged in: The scores and answers on
                          the questions across the quizzes you have taken. If you would like to request all of the data we hold
                          that is associated with your email address, email: hello@quodl.co.uk.
                      </div>
                      <br />
                      <h2 className="title">Can I object to the use of my data?</h2>
                      <br />
                      <div className="subtitle">
                          We may use your data for administering the quizzes, identifying students who are doing very well or
                          falling behind, and for scientific research. If you do not want your data to be used for any of these
                          purposes, email hello@quodl.co.uk. Depending on the nature of your request, it may mean that you
                          are no longer able to take part in quizzes.
                      </div>
                      <br />
                      <h2 className="title">Do you use the data for automated decision making?</h2>
                      <br />
                      <div className="subtitle">
                          People are sometimes worried about their data being used to make significant decisions
                          automatically, without human intervention. Quodl may share performance with your institution, but
                          does not make automated decisions (it shows different feedback based on your performance and
                          participation, but doesn’t make decisions around assessment or streaming or rewards or
                          interventions – if that were done it would be with human intervention by your institution).
                      </div>
                      <br />
                      <h2 className="title">Cookies</h2>
                      <br />
                      <div className="subtitle">
                          Like most websites, this site uses cookies. This allows you to navigate the site, look at your results
                          and take quizzes effectively. When you sign up for a Quodl account, you give permission for us to
                          use cookies.
                      </div>
                      <br />
                      <div className="subtitle">
                          Cookies are small text files that are saved on your computer when you visit a website. When you are
                          on the website, the site can read the text in your cookie and write text into the cookie. This means,
                          for example, that if you return to a website at a later time, the website can link the new visit with
                          previous visits you made; or when you have logged in, the website can keep track of who you’re
                          logged in as, and show you the appropriate content as you navigate across pages on the site.
                      </div>
                      <br />
                      <div className="subtitle">
                          We primarily use cookies for that second purpose. Once you log in to Quodl, a cookie helps keep
                          track of your login, so you see the quizzes that you’re signed up to, and get the feedback that’s
                          personalised to you.
                      </div>
                      <br />
                      <div className="subtitle">
                          Some sites use third-party cookies, which allow companies to track your browsing behaviour across
                          many different websites. We do not set third party cookies. Nor do we use advertising cookies.
                      </div>
                  </div>
            </div>
        </div>
    );
};

export default PrivacyMessageComponent;
