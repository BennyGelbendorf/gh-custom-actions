import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    const s3uri = `s3://${bucket}`;
    core.notice(`Deploying ${distFolder} to ${s3uri} in ${bucketRegion}`);

    await exec.exec('aws', ['s3', 'sync', distFolder, s3uri, '--region', bucketRegion]);
}

run().catch((error) => {
    core.setFailed(error.message);
});