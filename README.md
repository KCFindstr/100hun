# 100hun

100hun is a custom code status badge.

## Usage

### Simple Image

Just want an image? Use `https://100hun.rabimimi.com/badge/{number}.png`. `{number}` must be an integer between 0 and 100.

Example:

```markdown
![100hun](https://100hun.rabimimi.com/badge/100.png)
```

![100hun](https://100hun.rabimimi.com/badge/100.png)

Optionally, append `?size={size}` to change the size of the image between 16 and 256.

### Code Coverage

This can be used as a code coverage badge for [CodeCov](https://codecov.io/): `https://100hun.rabimimi.com/provider/{provider}/{service}/{owner}/{repo}/{branch}/badge.png`. Coverage is rounded to the nearest integer. (Currently, only CodeCov is supported as a `provider`.)

Example:

```
![100hun](https://100hun.rabimimi.com/provider/codecov/github/RabiMimi/RabiRiichi/develop/badge.png)
```

![100hun](https://100hun.rabimimi.com/provider/codecov/github/RabiMimi/RabiRiichi/develop/badge.png)

You can append `?size={size}` to change the badge size as well.

Want other support? Feel free to open a PR. The code should be very straightforward.

## Run Your Own 100Hun Server

If you want to use this badge in private repositories, you can run your own 100hun server and supply your own CodeCov token.

You should have NodeJS 18 or later installed. Then, create a `.env` file in the root directory of the project. The following environment variables are required:

```
PORT=8080
CODECOV_TOKEN=<your codecov token>
```

Finally, install the dependencies and run the server:

```bash
npm i
npm start
```
