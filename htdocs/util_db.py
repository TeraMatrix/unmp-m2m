import MySQLdb
from unmp_config import SystemConfig


class DB_Conn():
    def __init__(self):
        self.db_conn = None

    def db_connect(self):
        """
        Used to connect to the database  
        returns database object ed in global_db variable
        """
        try:
            self.db_conn = MySQLdb.connect(*SystemConfig.get_mysql_credentials())
            return self.db_conn
        except MySQLdb.Error as e:
            pass  # print "/*/*/* MYSQLdb Exception (db connect) : "+str(e)
        except Exception as e:
            pass  # print "/*/*/* Database Exception (db connect) : "+str(e)


    # def db_close(self):
    #     """
    #     closes connection with the database
    #     """
    #     try:
    #         self.db_conn.close()
    #     except Exception as e:
    #         pass  # print "/*/*/* Database Exception ( db close ) : "+str(e)
