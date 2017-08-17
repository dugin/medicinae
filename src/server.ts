import {Constants} from './config/constant';
import app from './config/app';

app.listen(Constants.PORT, () => {
    console.log('Express server listening on port ' + Constants.PORT);
});

