import React from 'react';

const PrivacyMessageComponent = () => {
    return (
        <div className="privacy">
            <h1 className="f-headline"><img className="holding-logo" src="/assets/dashboard_tile_logo.svg" /></h1>
            <div className="content__body">
                  <div className="form">
                    <div className="subtitle">
                        This statement sets out what data we collect from you,
                        the reasons for collecting it, and how you can access,
                        change or delete your personal data.
                    </div>
                    <br />
                      <h2 className="f-title">What data do we collect, and how do we use it?</h2>
                      <br />
                      <div className="subtitle">
                          When you sign up, you enter your email address, a nickname
                          (if you’re a student), and a password. We also record your
                          participation in quizzes, the answers you give, the medals and trophies you receive, and your overall
                          scores. Your email address is probably the most sensitive thing we record, as it’s the only thing that
                          uniquely identifies you. We use your data for several things:
                      </div>
                      <ul>
                          <li> We use your email address for login and user identification
                          – you enter your email address and password to log in. This
                          means your quiz scores and participation are linked to
                          your email address.
                          </li>
                          <li> Your scores on the quizzes you take are recorded,
                          and these scores are used to award badges, operate a
                          leaderboard and give you feedback on your performance.
                          </li>
                          <li> If you are a <i>student</i>, your lecturer or person setting
                          the quiz will be able to see your email address and
                          associated quiz scores and participation.
                          Lecturers will be able to use your email address according
                          to their institution’s rules and policies.
                          Most frequently this would be to award prizes or other
                          recognition for top scorers, or to check the situation
                          if you miss several quizzes or don’t score well across
                          many of them. Other students will only be able to see your
                          nickname – for example on the public leaderboard – they will
                          not be able to identify you unless you choose a nickname
                          that makes it obvious who you are.
                          </li>
                          <li> If you are a <i>student</i> it is also possible that
                          somebody other than your lecturer will be able to see your
                          data. We have the option of a group admin account type,
                          which is designed for programme or course directors who
                          want to see how things are going across a number of different
                          lecturers or modules that they are responsible for.
                          If someone is given this account, they will be able to
                          see data on your performance and participation across
                          everal modules or quiz series. Again, this is designed
                          so that course directors can award prizes for performance
                          across different modules (like a best-in-year award),
                          or identify students who may need extra support.
                          </li>
                          <li> If you are a <i>student</i>, your data may be shared with
                          your institution, and your email address may be used by
                          your institution to cross-tabulate Quodl data with data
                          about you held by your university, such as module enrolment,
                          assessment scores and data from your virtual learning environment
                          like moodle. This could be done for several reasons, including:
                          (1) to allow integration with virtual learning environments
                          like moodle, (2) to get a better picture of how individual
                          students are engaging with their course, (3) to try to
                          identify across students strategies that lead to successful
                          outcomes. In all cases, the primary aim would be to improve
                          your learning experience and outcomes, and those of students
                          who follow you. </li>
                          <li> Anonymised data may be used for scientific or commercial
                          research, such as better understanding how students learn,
                          factors affecting learning and performance, and how best
                          to predict performance. </li>
                          <li> If you are a <i>lecturer</i>, and your account was set up
                          by a group admin (usually the course director), the
                          group admin will have access to data on your students’
                          performance, which will also allow them to determine
                          things like the number of students taking your quizzes,
                          and the number of quizzes you have run.
                          </li>
                      </ul>
                      <br />
                      <div className="subtitle"><strong>Emailing You</strong></div>
                      These are the circumstances under which Quodl will use your email address to contact you:
                      <ul>
                          <li>
                              We send you a single email when you sign up to Quodl
                          </li>
                          <li>
                              We use your email address to allow you to reset your
                              password if you forget it – you can request an email
                              with a link to reset it.
                          </li>
                          <li>
                              We may very rarely send an email with important
                              information about changes to or developments with Quodl.
                          </li>
                          <li>
                              We may use your email address to contact you directly
                              if we notice any issues with your account.
                          </li>
                          <li>
                              If you are a lecturer, we also use your email address
                              for verification; by sending an email to the address
                              you give us to confirm that the email address is yours.
                          </li>
                      </ul>

                      <h2 className="f-title">Do you use the data for automated decision making?</h2>
                      <br />
                      <div className="subtitle">
                          People are sometimes worried about their data being
                          used to make significant decisions automatically, without
                          human intervention.Quodl may share performance with your
                          institution, and may use patterns of performance across
                          quizzes to highlight or categorise performance, for example,
                          so that lecturers can easily identify students who seem
                          to be doing well or badly. But it does not make automated
                          decisions – any decisions to act on that information
                          will be taken by a real person.
                      </div>
                      <br />
                      <h2 className="f-title">Where is the data held?</h2>
                      <br />
                      <div className="subtitle">
                          The data you submit is held within the EU.
                      </div>
                      <br />
                      <h2 className="f-title">Can I have a copy of my data?</h2>
                      <br />
                      <div className="subtitle">
                          Yes. You can see virtually all the data we hold when you are logged in: The scores and answers on
                          the questions across the quizzes you have taken. If you would like to request all of the data we hold
                          that is associated with your email address, email:
                          <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>.
                      </div>
                      <br />
                      <h2 className="f-title">How long is the data held for? Can I delete it?</h2>
                      <br />
                      <div className="subtitle">
                          We hold your data for the time you have an account with us. If you no longer want an account with
                          us and want to have any identifiable data deleted, we can sort that;
                          email your request to <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>.
                      </div>
                      <br />
                      <h2 className="f-title">There is something wrong with my data. Can I correct it?</h2>
                      <br />
                      <div className="subtitle">
                          Of course. If any of the details we hold on you are
                          inaccurate you can get in touch to have them corrected,
                          email: <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>
                      </div>
                      <br />
                      <h2 className="f-title">Can I object to the use of my data?</h2>
                      <br />
                      <div className="subtitle">
                          We may use your data for administering the quizzes,
                          identifying students who are doing very well or
                          falling behind, for analytics, prediction and for
                          scientific research. If you do not want your data to be used for any of these
                          purposes, email <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>. Depending on the nature of your request, it may mean that you
                          are no longer able to take part in quizzes.
                      </div>
                      <br />

                      <a name="consent"></a>
                      <h2 className="f-title">Consent</h2>
                      <br />
                      <div className="subtitle">
                      When you register, you give consent for Quodl to use your
                      data in the ways described in the privacy statement. Consent
                      is an ongoing process – you are free to withdraw consent at any time.
                      If you want to withdraw consent, you can email
                      <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>.
                      Depending on the specific aspects of consent you wish to withdraw,
                      you may not be able to continue to log in to Quodl once consent is
                      withdrawn. As you can see from the privacy statement, you can
                      also request a copy of your data, request a correction to
                      anything that you think is inaccurate, or have all of your
                      identifying data deleted. For all of these you can just email <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>.
                      <a href="mailto:hello@quodl.co.uk">hello@quodl.co.uk</a>.
                      </div>
                      <br />


                      <h2 className="f-title">Cookies</h2>
                      <br />
                      <div className="subtitle">
                          Like most websites, this site uses cookies. This allows
                          you to navigate the site, look at your results and take
                          quizzes effectively. When you sign up for a Quodl account,
                          you give permission for us to use cookies.
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
                          personalised to you. Without these cookies we would not be able to run the quizzes or other services
                          that Quodl offers.
                      </div>
                      <br />
                      <div className="subtitle">
                          We also use cookies for analytics. These are third-party
                          cookies set by Google that allow us to look at when and
                          how people use the site, which pages and features are most used,
                          and other details about the sequence of pages that users
                          load. This is all anonymous, and we can’t identify who
                          the individual users are. Use of Google Analytics cookies
                          allows us to understand how people use Quodl, and make
                          decisions about how to develop Quodl in the future.
                          These cookies are not necessary for using the site, and
                          if you want to disable these kinds of cookies on this
                          site and others, you can use a browser extension available
                          here: https://tools.google.com/dlpage/gaoptout.
                      </div>
                  </div>
            </div>
        </div>
    );
};

export default PrivacyMessageComponent;
