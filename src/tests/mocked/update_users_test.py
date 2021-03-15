'''this test checkes if the username is added to the database '''
import unittest
#import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../../'))
from app import add_user
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = 'user1'


class AddUserTestCase(unittest.TestCase):
    ''' function to test the add_user function '''
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'user2',
                KEY_EXPECTED: [INITIAL_USERNAME, 'user2'],
            },
        ]

        initial_person = models.Person(username=INITIAL_USERNAME, score=100)
        self.initial_db_mock = [initial_person]

    def mocked_db_session_add(self, username):
        '''appends to database'''
        self.initial_db_mock.append(username)

    def mocked_db_session_commit(self):
        '''commits to database'''
        #pass

    def mocked_person_query_all(self):
        '''query all'''
        return self.initial_db_mock

    def test_success(self):
        '''test success case'''
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        print(self.initial_db_mock)
                        actual_result = add_user(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(self.initial_db_mock)
                        print(expected_result)

                        self.assertEqual(len(actual_result),
                                         len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])


if __name__ == '__main__':
    unittest.main()
